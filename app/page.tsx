"use client"
import React, { useEffect, useState } from "react";
import Header from './header';
import CardCurrentTemp from './cardCurrentTemp';
import CardHourlyTemp from './cardHourlyTemp';
import CardDailyTemp from './cardDailyTemp';

// Defining types for weather data state
interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
  description: string; // Added description field
}

interface HourlyForecastData {
  dt: number;
  temp: number;
  weather: string;
  time: string;
  humidity: number;
}

interface DailyForecastApiResponse {
  EpochDate: number;
  Temperature: {
    Minimum: { Value: number };
    Maximum: { Value: number };
  };
  Day: {
    Icon: number;
    RelativeHumidity: {
      Average: number;
    };
  };
}


interface DailyForecastData {
  dt: number;
  temp: number;
  weather: string;
  time: string;
  humidity: number;
}

const ACCUWEATHER_API_KEY = process.env.NEXT_PUBLIC_ACCUWEATHER_API_KEY;
const BASE_URL = "https://dataservice.accuweather.com";

export default function Home() {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecastData[]>([]);
  const [error, setError] = useState<string | null>(null);


  const allIcons: Record<number, string> = {
    1: "./assets/clearSkyDay.svg", // Sunny
    2: "./assets/clearSkyDay.svg", // Mostly Sunny
    3: "./assets/fewCloudDay.svg", // Partly Sunny
    4: "./assets/fewCloudDay.svg", // Intermittent Clouds
    5: "./assets/fewCloudDay.svg", // Hazy Sunshine
    6: "./assets/cloud.svg", // Mostly Cloudy
    7: "./assets/cloud.svg", // Cloudy
    8: "./assets/cloud.svg", // Dreary (Overcast)
    11: "./assets/fogDay.svg", // Fog (Day)
    12: "./assets/showerRainDay.svg", // Showers (Day)
    13: "./assets/cloud.svg", // Mostly Cloudy w/ Showers (Day)
    14: "./assets/showerRainDay.svg", // Partly Sunny w/ Showers (Day)
    15: "./assets/thunderstormDay.svg", // T-Storms (Day)
    16: "./assets/thunderstormDay.svg", // Mostly Cloudy w/ T-Storms (Day)
    17: "./assets/thunderstormDay.svg", // Partly Sunny w/ T-Storms (Day)
    18: "./assets/rainDay.svg", // Rain (Day)
    19: "./assets/snow.svg", // Flurries
    20: "./assets/snow.svg", // Mostly Cloudy w/ Flurries
    21: "./assets/snow.svg", // Partly Sunny w/ Flurries
    22: "./assets/snow.svg", // Snow
    23: "./assets/snow.svg", // Mostly Cloudy w/ Snow
    24: "./assets/snow.svg", // Ice
    25: "./assets/snow.svg", // Sleet
    26: "./assets/rainDay.svg", // Freezing Rain
    29: "./assets/rainDay.svg", // Rain and Snow
    30: "./assets/clearSkyDay.svg", // Hot
    31: "./assets/clearSkyNight.svg", // Cold (Night)
    32: "./assets/clearSkyDay.svg", // Windy (Day)
    33: "./assets/clearSkyNight.svg", // Clear (Night)
    34: "./assets/clearSkyNight.svg", // Mostly Clear (Night)
    35: "./assets/fewCloudNight.svg", // Partly Cloudy (Night)
    36: "./assets/fewCloudNight.svg", // Intermittent Clouds (Night)
    37: "./assets/fewCloudNight.svg", // Hazy Moonlight (Night)
    38: "./assets/cloud.svg", // Mostly Cloudy (Night)
    39: "./assets/showerRainNight.svg", // Partly Cloudy w/ Showers (Night)
    40: "./assets/showerRainNight.svg", // Mostly Cloudy w/ Showers (Night)
    41: "./assets/thunderstormNight.svg", // Partly Cloudy w/ T-Storms (Night)
    42: "./assets/thunderstormNight.svg", // Mostly Cloudy w/ T-Storms (Night)
    43: "./assets/snow.svg", // Mostly Cloudy w/ Flurries (Night)
    44: "./assets/snow.svg" // Mostly Cloudy w/ Snow (Night)
  };

  // Function to search for city and get weather data
  const search = async (city: string) => {
    try {
      const locationResponse = await fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${city}`);
      const locationData = await locationResponse.json();

      if (!locationData.length) {
        throw new Error("City not found");
      }

      const locationKey = locationData[0].Key;

      const weatherResponse = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`);
      const weatherData = await weatherResponse.json();
      const weather = weatherData[0];

      setWeatherData({
        humidity: weather.RelativeHumidity,
        windSpeed: weather.Wind.Speed.Metric.Value,
        temperature: Math.floor(weather.Temperature.Metric.Value),
        location: `${locationData[0].LocalizedName}, ${locationData[0].Country.LocalizedName}, ${locationData[0].AdministrativeArea.LocalizedName}`,
        icon: allIcons[weather.WeatherIcon],
        description: weather.WeatherText
      });
      setError(null); // Reset error state on success
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Could not fetch weather data. Please try again."); // Set error message
    }
  };

  // Function to fetch hourly forecast
  const fetchHourlyForecast = async (city: string) => {
    try {
      const locationResponse = await fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${city}`);
      const locationData = await locationResponse.json();

      if (!locationData.length) {
        throw new Error("City not found");
      }

      const locationKey = locationData[0].Key;

      const forecastResponse = await fetch(`${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&metric=true&details=true`);
      const forecastData = await forecastResponse.json();

      const formattedHourlyData = forecastData.map((item: { EpochDateTime: number; Temperature: { Value: number }; WeatherIcon: number; RelativeHumidity: number }) => ({
        dt: item.EpochDateTime,
        temp: Math.floor(item.Temperature.Value),
        weather: allIcons[item.WeatherIcon],
        time: new Date(item.EpochDateTime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        humidity: item.RelativeHumidity
      }));

      console.log("Formatted Hourly Data:", formattedHourlyData);
      setHourlyForecast(formattedHourlyData);
    } catch (error) {
      console.error("Error fetching hourly forecast:", error);

    }
  };

  const fetchDailyForecast = async (city: string) => {
    try {
      const locationResponse = await fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${city}`);
      const locationData = await locationResponse.json();

      if (!locationData.length) {
        throw new Error("City not found");
      }

      const locationKey = locationData[0].Key;

      const forecastResponse = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&metric=true&details=true`);
      const forecastData = await forecastResponse.json();

      const formattedDailyData = forecastData.DailyForecasts.map((item: DailyForecastApiResponse) => ({
        dt: item.EpochDate,
        temp: Math.floor(item.Temperature.Maximum.Value), // Use Maximum for daily high
        weather: allIcons[item.Day.Icon], // Accessing the icon for the day
        time: new Date(item.EpochDate * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        humidity: item.Day.RelativeHumidity.Average // Average humidity for the day
      }));

      console.log("Formatted Daily Data:", formattedDailyData);
      setDailyForecast(formattedDailyData); // Assuming you want to set daily forecast
    } catch (error) {
      console.error("Error fetching daily forecast:", error);
    }
  };

  const getLocationWeather = async (lat: number, lon: number) => {
    try {
      const locationResponse = await fetch(`${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${ACCUWEATHER_API_KEY}&q=${lat},${lon}`);
      const locationData = await locationResponse.json();
      const locationKey = locationData.Key;

      const weatherResponse = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`);
      const weatherData = await weatherResponse.json();
      const weather = weatherData[0];

      setWeatherData({
        humidity: weather.RelativeHumidity,
        windSpeed: weather.Wind.Speed.Metric.Value,
        temperature: Math.floor(weather.Temperature.Metric.Value),
        location: `${locationData.LocalizedName}, ${locationData.Country.LocalizedName}, ${locationData.AdministrativeArea.LocalizedName}`,
        icon: allIcons[weather.WeatherIcon],
        description: weather.WeatherText
      });
      setError(null); // Reset error state on success
    } catch (error) {
      console.error("Error fetching weather data by location:", error);
      setError("Could not fetch weather data for your location.");
    }
  };

  // Function to get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getLocationWeather(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    const city = "Warsaw";
    search(city);
    fetchHourlyForecast(city);
    fetchDailyForecast(city); // Corrected function name call
  }, []);



  return (

    <>
      <section className="Container">
        <Header search={search} fetchHourlyForecast={fetchHourlyForecast} fetchDailyForecast={fetchDailyForecast} getLocation={getLocation} />
        {error && <p className="error-message">{error}</p>}
        {weatherData && (
          <CardCurrentTemp
            temperature={weatherData.temperature}
            location={weatherData.location}
            icon={weatherData.icon}
            description={weatherData.description} // Przekazanie opisu do CardCurrentTemp
          />
        )}
        <div className="textToday"><p>Today at</p></div>
        {hourlyForecast.length > 0 && <CardHourlyTemp hourlyData={hourlyForecast} />}
        <div className="textToday"><p>Other days</p></div>
        {dailyForecast.length > 0 && <CardDailyTemp dailyData={dailyForecast} />}
      </section>
    </>
  );
}

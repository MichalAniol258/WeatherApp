# Weather Application

## Description
A weather application that utilizes the AccuWeather API allows users to track current weather conditions, forecasts, and hourly predictions for any location. It was created using **TypeScript**, **React**, and **Next.js**, providing fast loading, performance, and ease of development.

## Features
- **Current Weather Display**: Users can view the current weather conditions for their selected location.
- **Multi-Day Forecast**: The application displays forecasts for the coming days, enabling planning.
- **Hourly Forecast**: Users can browse hourly forecasts with an intuitive interface.
- **Location Utilization**: Allows users to use their current location to display the weather.
- **Responsive Interface**: The application works smoothly on various devices, so users can access it on mobile phones, tablets, and desktop computers.

## Technologies
- **React**: A library for building user interfaces.
- **Next.js**: A React framework that enables server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static typing, making development and maintenance easier.
- **AccuWeather API**: An external API for retrieving weather data.

## Installation
To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MichalAniol258/WeatherApp.git
   cd WeatherApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000`.

## Configuration
- Make sure you have a valid API key for AccuWeather. You can obtain it by signing up at [AccuWeather API](https://developer.accuweather.com/).
- Add your API key to the `.env.local` file:
   ```
   NEXT_PUBLIC_ACCUWEATHER_API_KEY=your_api_key
   ```

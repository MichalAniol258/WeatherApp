import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function Header({ search, fetchHourlyForecast, fetchDailyForecast, getLocation }) {
    const [city, setCity] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (!city.trim()) {
            setErrorMessage("Please enter a city name.");
            return;
        }

        try {
            await fetchHourlyForecast(city);
            await fetchDailyForecast(city);
            search(city);
            setCity('');
            setErrorMessage('');
        } catch {

        }
    };

    return (
        <section className="sHeader">
            <header>
                <form onSubmit={handleSearchSubmit}>
                    <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} style={{ color: "#f4a261" }} />
                    <input
                        placeholder="Search for a city..."
                        className="weather-searchinput"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={getLocation} className="location-button">
                    <FontAwesomeIcon className="locationIcon" icon={faLocationArrow} style={{ color: "#f4a261" }} /> Use My Location
                </button>
            </header>
        </section>
    );
}

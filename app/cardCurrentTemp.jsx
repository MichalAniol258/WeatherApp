import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

export default function CardCurrentTemp({ temperature, description, location, icon }) {

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        weekday: 'long', // pełna nazwa dnia tygodnia
        day: 'numeric', // dzień
        month: 'short',
    });

    return (
        <section className="sCardCurrentTemp">
            <main>
                <div className="cardCurrentTemp">
                    <div className="cardBody">
                        <p>Now</p>
                        <div className="cardImage">
                            {/* Wyświetlanie dynamicznej temperatury */}
                            <h2>{temperature}°C</h2>
                            {/* Dynamiczna ikona pogody */}
                            <Image src={icon} alt="Weather Icon" width={50} height={50} className="weather-icon" />
                        </div>
                        <span>{description}</span>
                        <div className="line"></div>
                        <div className="iconsCard">
                            <FontAwesomeIcon
                                className="cardIcon"
                                icon={faCalendar}
                                style={{ color: "#f4a261" }}
                            />
                            {/* Wyświetlanie dynamicznej daty */}
                            <p>{formattedDate}</p>
                        </div>

                        <div className="iconsCard">
                            <FontAwesomeIcon
                                className="cardIcon"
                                icon={faLocationDot}
                                style={{ color: "#f4a261" }}
                            />
                            {/* Wyświetlanie dynamicznej lokalizacji */}
                            <p>{location}</p>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}

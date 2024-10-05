import Image from 'next/image';

export default function CardHourlyTemp({ hourlyData }) {
    return (
        <section className="sCardHourlyTemp">
            {hourlyData.map((data, index) => (
                <div className="cardHourlyBody" key={index}>
                    <div className="hourlyCard">
                        <p>{data.time}</p>
                        <span>{data.temp}°</span>
                        <div className="hourlyImg">
                            <Image src={`${data.weather}`} width={50} height={50} className="hourlyIcon" alt={data.weather} />
                        </div>
                        <div className="hourlyHumidity">
                            <Image src="/assets/drop.svg" width={50} height={50} alt="Humidity" />
                            <p>{data.humidity}%</p> {/* Display humidity */}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

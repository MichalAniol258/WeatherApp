import Image from 'next/image';
export default function CardDailyTemp({ dailyData }) {
    const getDayLabel = (index) => {
        switch (index) {
            case 0:
                return "Today";
            case 1:
                return "Tomorrow";
            default:
                return `For ${index} days`; // Zmienna liczba dni
        }
    };

    return (
        <section className="sCardHourlyTemp">
            {dailyData.map((data, index) => (
                <div className="cardHourlyBody" key={index}>
                    <div className="hourlyCard">
                        <p>{getDayLabel(index)}</p> {/* Wyświetlanie "Dzisiaj", "Jutro", itp. */}
                        <span>{data.temp}°</span>
                        <div className="hourlyImg">
                            <Image src={`${data.weather}`} width={50} height={50} className="hourlyIcon" alt={data.weather} />
                        </div>
                        <div className="hourlyHumidity">
                            <Image src="/assets/drop.svg" width={50} height={50} alt="" />
                            <p>{data.humidity}%</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default function HourlyForecast({ hourlyData }) {
    return (
      <div className="hourly-forecast">
        <div className="hourly-title">Hourly forecast</div>
        <div className="hourly-times">
          {hourlyData.map((hour) => (
            <div key={hour.time} className="hour-item">
              <div className="hour-temp">{hour.temp}°</div>
              <div className="hour-time">{hour.time}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
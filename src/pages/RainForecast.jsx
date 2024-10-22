export default function RainForecast({ rainChanceData }) {
    return (
      <div className="rain-section">
        <h3>Chance of rain</h3>
        <div className="rain-chart">
          {rainChanceData.map((item) => (
            <div key={item.time} className="rain-item">
              <div className="rain-time">{item.time}</div>
              <div className="rain-bar">
                <div
                  className="rain-progress"
                  style={{ width: `${item.chance}%` }}
                />
              </div>
              <div className="rain-percentage">{item.chance}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
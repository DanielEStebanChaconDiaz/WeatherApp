export default function SunTimes({ sunrise, sunset }) {
    return (
      <div className="sun-times">
        <div className="sun-item">
          <div className="sun-label">Sunrise</div>
          <div className="sun-value">{sunrise}</div>
        </div>
        <div className="sun-item">
          <div className="sun-label">Sunset</div>
          <div className="sun-value">{sunset}</div>
        </div>
      </div>
    );
  }
  
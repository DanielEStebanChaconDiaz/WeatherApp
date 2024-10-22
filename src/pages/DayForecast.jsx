import React from 'react';

export default function DayForecast() {
  return (
    <div className="forecast-section">
      <h3>Day forecast</h3>
      <div className="forecast-graph">
        <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
          <path
            d="M0,50 C25,45 75,65 150,50 C225,35 275,55 300,45"
            stroke="#581C87"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
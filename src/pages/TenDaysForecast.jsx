import React from 'react';

export default function TenDaysForecast({ forecast }) {
  return (
    <div className="ten-days-forecast">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <div className="flex-col">
            <span>{day.day}</span>
            <span>{day.condition}</span>
          </div>
          <div className="flex items-center">
            <span>{day.high}º / {day.low}º</span>
            {day.condition.includes('Sunny') ? (
              <div className="w-8">
                <img src="/storage/img/solecito1.svg" alt="sunny" />
              </div>
            ) : (
              <div className="w-8">
                <img src="/storage/img/nublado.svg" alt="cloudy" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
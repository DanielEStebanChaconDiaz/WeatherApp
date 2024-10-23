import React from 'react';
import { Wind, Droplets, Gauge, Sun } from 'lucide-react';

export default function MetricsGrid({ weatherData, activeTab }) {
  // Get the appropriate forecast based on active tab
  const getCurrentMetrics = () => {
    const current = weatherData.current.current;
    const todayForecast = weatherData.forecast.forecast.forecastday[0].day;
    
    return {
      wind: {
        value: `${Math.round(current.wind_kph)} km/h`,
        trend: `${current.wind_dir} ${calculateTrend(current.wind_kph, todayForecast.maxwind_kph, 'km/h')}`
      },
      rain: {
        value: `${todayForecast.daily_chance_of_rain}%`,
        trend: calculateTrend(current.precip_mm, todayForecast.totalprecip_mm, '%')
      },
      pressure: {
        value: `${Math.round(current.pressure_mb)} hPa`,
        trend: calculateTrend(current.pressure_mb, current.pressure_mb + current.pressure_trend, 'hPa')
      },
      uv: {
        value: current.uv.toString(),
        trend: calculateTrend(current.uv, todayForecast.uv, '')
      }
    };
  };

  const getTomorrowMetrics = () => {
    const tomorrowForecast = weatherData.forecast.forecast.forecastday[1].day;
    const todayForecast = weatherData.forecast.forecast.forecastday[0].day;
    
    return {
      wind: {
        value: `${Math.round(tomorrowForecast.maxwind_kph)} km/h`,
        trend: calculateTrend(todayForecast.maxwind_kph, tomorrowForecast.maxwind_kph, 'km/h')
      },
      rain: {
        value: `${tomorrowForecast.daily_chance_of_rain}%`,
        trend: calculateTrend(todayForecast.daily_chance_of_rain, tomorrowForecast.daily_chance_of_rain, '%')
      },
      pressure: {
        value: `${Math.round(tomorrowForecast.pressure_mb || weatherData.current.current.pressure_mb)} hPa`,
        trend: calculateTrend(todayForecast.pressure_mb || weatherData.current.current.pressure_mb, 
                            tomorrowForecast.pressure_mb || weatherData.current.current.pressure_mb, 'hPa')
      },
      uv: {
        value: tomorrowForecast.uv.toString(),
        trend: calculateTrend(todayForecast.uv, tomorrowForecast.uv, '')
      }
    };
  };

  const calculateTrend = (currentValue, compareValue, unit) => {
    const difference = compareValue - currentValue;
    const roundedDiff = Math.abs(Math.round(difference * 10) / 10);
    
    if (difference > 0) {
      return `↑ ${roundedDiff}${unit}`;
    } else if (difference < 0) {
      return `↓ ${roundedDiff}${unit}`;
    }
    return `→ ${roundedDiff}${unit}`;
  };

  const metrics = activeTab === 'today' ? getCurrentMetrics() : getTomorrowMetrics();

  const metricsConfig = [
    { 
      Icon: Wind, 
      value: metrics.wind.value, 
      label: 'Wind speed', 
      trend: metrics.wind.trend 
    },
    { 
      Icon: Droplets, 
      value: metrics.rain.value, 
      label: 'Rain chance', 
      trend: metrics.rain.trend 
    },
    { 
      Icon: Gauge, 
      value: metrics.pressure.value, 
      label: 'Pressure', 
      trend: metrics.pressure.trend 
    },
    { 
      Icon: Sun, 
      value: metrics.uv.value, 
      label: 'UV index', 
      trend: metrics.uv.trend 
    }
  ];

  return (
    <div className="metrics-grid">
      {metricsConfig.map(({ Icon, value, label, trend }) => (
        <div key={label} className="detail-card">
          <div className="detail-info">
            <Icon size={20} className="detail-icon" />
            <div>
              <div className="detail-value">{value}</div>
              <div className="detail-label">{label}</div>
            </div>
          </div>
          <div className="detail-trend">{trend}</div>
        </div>
      ))}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Gauge, Sun } from 'lucide-react';
import '../styles/home.css'
export default function Home() {
  const [activeTab, setActiveTab] = useState('today');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);  // Changed from 50 to 10 to match the CSS
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'tenDays', label: '10 days' }
  ];

  const hourlyData = [
    { time: 'Now', temp: 10 },
    { time: '10AM', temp: 8 },
    { time: '11AM', temp: 5 },
    { time: '12PM', temp: 12 },
    { time: '1PM', temp: 9 },
    { time: '2PM', temp: 12 },
  ];

  const rainChanceData = [
    { time: '7 PM', chance: 27 },
    { time: '8 PM', chance: 44 },
    { time: '9 PM', chance: 56 },
    { time: '10 PM', chance: 88 },
  ];

  const tenDaysForecast = [
    { day: 'Today', condition: 'Cloudy and Sunny', high: 3, low: -2 },
    { day: 'Thursday, Jan 19', condition: 'Cloudy', high: 3, low: -2 },
    { day: 'Friday, Jan 20', condition: 'Cloudy', high: 3, low: -2 },
    { day: 'Saturday, Jan 21', condition: 'Cloudy and Sunny', high: 3, low: -2 },
    { day: 'Sunday, Jan 22', condition: 'Cloudy', high: 3, low: -2 },
    { day: 'Monday, Jan 23', condition: 'Cloudy and Sunny', high: 3, low: -2 }
  ];

  const renderTenDays = () => (
    <div className="ten-days-forecast">
      {tenDaysForecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <div className="flex-col">
            <span>{day.day}</span>
            <span>{day.condition}</span>
          </div>
          <div className="flex items-center">
            <span>{day.high}º / {day.low}º</span>
            {day.condition.includes('Sunny') ? (
              <div className="w-8">
                <img
                  src="/storage/img/solecito1.svg"
                  alt="sunny"
                />
              </div>
            ) : (
              <div className="w-8">
                <img
                  src="/storage/img/nublado.svg"
                  alt="cloudy"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`home ${isScrolled ? 'scrolled' : ''}`}>
      <img src="/storage/img/background.png" alt="" className="imagenHome" />

      <div className="main-content">
        <div className="header">
          <h2>Kharkiv, Ukraine</h2>
          <img src="/storage/img/search_white.png" alt="" className="search-icon" />
        </div>

        <div className="clima">
          <div className="temperatura">
            <h1>3º</h1>
            <h3>Feels like -2º</h3>
          </div>
          <div className="imagenclima">
            <img src="/storage/img/solecito.svg" alt="" className="climasol" />
            <h2>Cloudy</h2>
          </div>
        </div>

        <div className="bottom">
          <h2>January 18, 16:14</h2>
          <div className="day">
            <h2>Day 3º</h2>
            <h2>Night -1º</h2>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'tenDays' ? renderTenDays() : (
          <>
            <div className="metrics-grid">
              <div className="detail-card">
                <div className="detail-info">
                  <Wind size={20} className="detail-icon" />
                  <div>
                    <div className="detail-value">12km/h</div>
                    <div className="detail-label">Wind speed</div>
                  </div>
                </div>
                <div className="detail-trend">↑ 2 km/h</div>
              </div>

              <div className="detail-card">
                <div className="detail-info">
                  <Droplets size={20} className="detail-icon" />
                  <div>
                    <div className="detail-value">24%</div>
                    <div className="detail-label">Rain chance</div>
                  </div>
                </div>
                <div className="detail-trend">↑ 10%</div>
              </div>

              <div className="detail-card">
                <div className="detail-info">
                  <Gauge size={20} className="detail-icon" />
                  <div>
                    <div className="detail-value">720 hPa</div>
                    <div className="detail-label">Pressure</div>
                  </div>
                </div>
                <div className="detail-trend">↓ 32 hpa</div>
              </div>

              <div className="detail-card">
                <div className="detail-info">
                  <Sun size={20} className="detail-icon" />
                  <div>
                    <div className="detail-value">2.3</div>
                    <div className="detail-label">UV index</div>
                  </div>
                </div>
                <div className="detail-trend">↓ 0.3</div>
              </div>
            </div>

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

            <div className="sun-times">
              <div className="sun-item">
                <div className="sun-label">Sunrise</div>
                <div className="sun-value">4:20 AM</div>
              </div>
              <div className="sun-item">
                <div className="sun-label">Sunset</div>
                <div className="sun-value">4:50 PM</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

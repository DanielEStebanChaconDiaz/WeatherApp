import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import WeatherHeader from './WeatherHeader';
import CurrentWeather from './CurrentWeather';
import WeatherTabs from './WeatherTabs';
import MetricsGrid from './MetricsGrid';
import HourlyForecast from './HourlyForecast';
import DayForecast from './DayForecast';
import RainForecast from './RainForecast';
import SunTimes from './SunTimes';
import TenDaysForecast from './TenDaysForecast';
import { weatherService } from '../services/weatherApi';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const [current, forecast] = await Promise.all([
          weatherService.getCurrentWeather(`${latitude},${longitude}`),
          weatherService.getForecast(`${latitude},${longitude}`, 10)
        ]);

        setWeatherData({ current, forecast });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            setLocationError(error.message);
            setLoading(false);
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (locationError) {
    return <div>Error: {locationError}</div>;
  }

  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  const { current, forecast } = weatherData;

  const hourlyData = forecast.forecast.forecastday[0].hour.map(hour => ({
    time: new Date(hour.time).getHours() + ':00',
    temp: hour.temp_c
  }));

  const rainChanceData = forecast.forecast.forecastday[0].hour.map(hour => ({
    time: new Date(hour.time).getHours() + ':00',
    chance: hour.chance_of_rain
  }));

  // Obtener la fecha de hoy
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  const todayForecast = forecast.forecast.forecastday.find(day => day.date === today);

  if (!todayForecast) {
    return <div>No data available for today.</div>;
  }

  const tenDaysForecast = forecast.forecast.forecastday.map(day => ({
    day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    condition: day.day.condition.text,
    high: Math.round(day.day.maxtemp_c),
    low: Math.round(day.day.mintemp_c)
  }));

  return (
    <div className={`home ${isScrolled ? 'scrolled' : ''}`}>
      <img src="/storage/img/background.png" alt="" className="imagenHome" />

      <div className="main-content">
        <WeatherHeader location={current.location.name} />
        <CurrentWeather 
          temperature={Math.round(current.current.temp_c)}
          feelsLike={Math.round(current.current.feelslike_c)}
          condition={current.current.condition.text}
        />
      </div>

      <div className="weather-details">
        <WeatherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'tenDays' ? (
          <TenDaysForecast forecast={tenDaysForecast} />
        ) : (
          <>
            <MetricsGrid />
            <HourlyForecast hourlyData={hourlyData} />
            <DayForecast 
              condition={todayForecast.day.condition.text} 
              high={Math.round(todayForecast.day.maxtemp_c)} 
              low={Math.round(todayForecast.day.mintemp_c)}
            />
            <RainForecast rainChanceData={rainChanceData} />
            <SunTimes 
              sunrise={todayForecast.astro.sunrise}
              sunset={todayForecast.astro.sunset}
            />
          </>
        )}
      </div>
    </div>
  );
}

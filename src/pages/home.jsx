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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const dt = currentDateTime.toISOString();
        const [current, forecast] = await Promise.all([
          weatherService.getCurrentWeather(`${latitude},${longitude}`, dt),
          weatherService.getForecast(`${latitude},${longitude}`, 10, dt)
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
  }, [currentDateTime]);

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

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formattedDate = currentDateTime.toLocaleDateString('es-ES', dateOptions);
  const formattedTime = currentDateTime.toLocaleTimeString('es-ES', timeOptions);
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  const capitalizedDateTime = formattedDateTime.replace(/^\w|\s\w/g, letra => letra.toUpperCase());

  // Get today's and tomorrow's dates
  const today = currentDateTime.toISOString().split('T')[0];
  const tomorrow = new Date(currentDateTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  // Get forecasts for today and tomorrow
  const todayForecast = forecast.forecast.forecastday.find(day => day.date === today);
  const tomorrowForecast = forecast.forecast.forecastday.find(day => day.date === tomorrowDate);

  if (!todayForecast || !tomorrowForecast) {
    return <div>Forecast data not available.</div>;
  }

  // Get hourly data based on active tab
  const getHourlyData = (selectedForecast) => {
    return selectedForecast.hour.map(hour => ({
      time: new Date(hour.time).getHours() + ':00',
      temp: hour.temp_c
    }));
  };

  // Get rain chance data based on active tab
  const getRainChanceData = (selectedForecast) => {
    return selectedForecast.hour.map(hour => ({
      time: new Date(hour.time).getHours() + ':00',
      chance: hour.chance_of_rain
    }));
  };

  // Get the appropriate forecast data based on active tab
  const activeForecast = activeTab === 'today' ? todayForecast : tomorrowForecast;
  const hourlyData = getHourlyData(activeForecast);
  const rainChanceData = getRainChanceData(activeForecast);

  const tenDaysForecast = forecast.forecast.forecastday.map(day => ({
    day: new Date(day.date).toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }),
    condition: day.day.condition.text,
    high: Math.round(day.day.maxtemp_c),
    low: Math.round(day.day.mintemp_c)
  }));

  const capitalizedTenDaysForecast = tenDaysForecast.map(forecast => ({
    ...forecast,
    day: forecast.day.replace(/^\w|\s\w/g, letra => letra.toUpperCase())
  }));

  return (
    <div className={`home ${isScrolled ? 'scrolled' : ''}`}>
      <img src="/storage/img/background.png" alt="" className="imagenHome" />

      <div className="main-content">
        <WeatherHeader
          location={current.location.name}
          datetime={capitalizedDateTime}
        />
        <CurrentWeather
          temperature={activeTab === 'today' ? Math.round(current.current.temp_c) : Math.round(tomorrowForecast.day.avgtemp_c)}
          feelsLike={activeTab === 'today' ? Math.round(current.current.feelslike_c) : Math.round(tomorrowForecast.day.avgtemp_c)}
          condition={activeTab === 'today' ? current.current.condition.text : tomorrowForecast.day.condition.text}
          dayTemp={Math.round(activeForecast.day.maxtemp_c)}
          nightTemp={Math.round(activeForecast.day.mintemp_c)}
        />
      </div>

      <div className="weather-details">
        <WeatherTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'tenDays' ? (
          <TenDaysForecast forecast={capitalizedTenDaysForecast} />
        ) : (
          <>
            <MetricsGrid weatherData={weatherData} activeTab={activeTab} />
            <HourlyForecast hourlyData={hourlyData} />
            <DayForecast
              condition={activeForecast.day.condition.text}
              high={Math.round(activeForecast.day.maxtemp_c)}
              low={Math.round(activeForecast.day.mintemp_c)}
            />
            <RainForecast rainChanceData={rainChanceData} />
            <SunTimes
              sunrise={activeForecast.astro.sunrise}
              sunset={activeForecast.astro.sunset}
            />
          </>
        )}
      </div>
    </div>
  );
}
const API_KEY = '64c98a4acc9841aab8b224152242210';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const weatherService = {
  async getCurrentWeather(location) {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );
    const data = await response.json();
    console.log('Current Weather Data:', data); // Comprobar datos
    return data;
  },

  async getForecast(location, days = 10) {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=yes&alerts=yes`
    );
    const data = await response.json();
    console.log('Forecast Data:', data); // Comprobar datos
    return data;
  }
};

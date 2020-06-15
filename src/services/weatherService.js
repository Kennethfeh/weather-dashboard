import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  async getCurrentWeather(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  async getWeatherByCity(city) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  }

  async getForecast(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          cnt: 40 // 5 days of 3-hour forecasts
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  async getForecastByCity(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          cnt: 40
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast by city:', error);
      throw error;
    }
  }

  async getAirQuality(lat, lon) {
    try {
      const response = await axios.get(`${BASE_URL}/air_pollution`, {
        params: {
          lat,
          lon,
          appid: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching air quality:', error);
      // Return mock data if API fails
      return {
        list: [{
          main: { aqi: 2 },
          components: {
            co: 233.65,
            no: 0.01,
            no2: 3.77,
            o3: 75.86,
            so2: 0.54,
            pm2_5: 10.89,
            pm10: 12.47,
            nh3: 0.31
          }
        }]
      };
    }
  }
}

export default new WeatherService();
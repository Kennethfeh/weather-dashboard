import { format, fromUnixTime } from 'date-fns';

export const formatTemperature = (temp, unit = 'C') => {
  if (unit === 'F') {
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const formatTime = (timestamp) => {
  return format(fromUnixTime(timestamp), 'HH:mm');
};

export const formatDate = (timestamp) => {
  return format(fromUnixTime(timestamp), 'MMM dd');
};

export const formatFullDate = (timestamp) => {
  return format(fromUnixTime(timestamp), 'EEEE, MMMM dd, yyyy');
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUVIndexLevel = (uvi) => {
  if (uvi <= 2) return { level: 'Low', color: '#4CAF50' };
  if (uvi <= 5) return { level: 'Moderate', color: '#FFC107' };
  if (uvi <= 7) return { level: 'High', color: '#FF9800' };
  if (uvi <= 10) return { level: 'Very High', color: '#F44336' };
  return { level: 'Extreme', color: '#9C27B0' };
};

export const getAirQualityLevel = (aqi) => {
  const levels = {
    1: { level: 'Good', color: '#4CAF50' },
    2: { level: 'Fair', color: '#8BC34A' },
    3: { level: 'Moderate', color: '#FFC107' },
    4: { level: 'Poor', color: '#FF9800' },
    5: { level: 'Very Poor', color: '#F44336' }
  };
  return levels[aqi] || { level: 'Unknown', color: '#9E9E9E' };
};

export const groupForecastByDay = (forecastList) => {
  const grouped = {};
  
  forecastList.forEach(item => {
    const date = format(fromUnixTime(item.dt), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  
  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map(item => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get the most common weather condition
    const weatherCounts = {};
    items.forEach(item => {
      const main = item.weather[0].main;
      weatherCounts[main] = (weatherCounts[main] || 0) + 1;
    });
    
    const mostCommonWeather = Object.entries(weatherCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
    
    const weatherItem = items.find(item => item.weather[0].main === mostCommonWeather);
    
    return {
      date,
      minTemp,
      maxTemp,
      weather: weatherItem.weather[0],
      items
    };
  });
};
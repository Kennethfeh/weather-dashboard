import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import TemperatureChart from './components/TemperatureChart';
import PrecipitationChart from './components/PrecipitationChart';
import WindChart from './components/WindChart';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import weatherService from './services/weatherService';
import geolocationService from './services/geolocationService';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin: 0 0 0.5rem 0;
    font-weight: 300;
    
    span {
      font-weight: 600;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Load weather for default city on mount
  useEffect(() => {
    loadWeatherByCity('London');
  }, []);

  const loadWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getWeatherByCity(city),
        weatherService.getForecastByCity(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation({
        city: weatherData.name,
        country: weatherData.sys.country
      });
    } catch (err) {
      setError('Unable to fetch weather data. Please check the city name and try again.');
      console.error('Error loading weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData, locationData] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon),
        weatherService.getForecast(lat, lon),
        geolocationService.getCityFromCoordinates(lat, lon)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation(locationData);
    } catch (err) {
      setError('Unable to fetch weather data for your location.');
      console.error('Error loading weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    loadWeatherByCity(city);
  };

  const handleLocationClick = async () => {
    setIsLoadingLocation(true);
    setError(null);
    
    try {
      const position = await geolocationService.getCurrentPosition();
      await loadWeatherByCoordinates(position.latitude, position.longitude);
    } catch (err) {
      setError(err.message || 'Unable to get your location. Please enable location services and try again.');
      console.error('Error getting location:', err);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <AppContainer>
      <Container>
        <Header>
          <h1>Weather <span>Dashboard</span></h1>
          <p>Real-time weather information with detailed forecasts</p>
        </Header>

        <SearchBar 
          onSearch={handleSearch}
          onLocationClick={handleLocationClick}
          isLoadingLocation={isLoadingLocation}
        />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <Loading />
        ) : (
          <>
            {currentWeather && (
              <>
                <CurrentWeather weather={currentWeather} location={location} />
                
                {forecast && (
                  <>
                    <ForecastCard forecast={forecast} />
                    
                    <ChartsGrid>
                      <TemperatureChart forecast={forecast} />
                      <PrecipitationChart forecast={forecast} />
                      <WindChart forecast={forecast} />
                    </ChartsGrid>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </AppContainer>
  );
}

export default App;
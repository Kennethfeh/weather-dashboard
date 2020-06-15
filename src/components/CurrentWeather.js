import React from 'react';
import styled from 'styled-components';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { formatTemperature, getWeatherIcon, getWindDirection, formatFullDate } from '../utils/weatherUtils';

const WeatherCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Location = styled.div`
  h2 {
    font-size: 2rem;
    margin: 0;
    font-weight: 300;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;

const DateTime = styled.div`
  text-align: right;
  opacity: 0.9;
  font-size: 0.9rem;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Temperature = styled.div`
  display: flex;
  align-items: center;
  
  .temp-value {
    font-size: 4rem;
    font-weight: 200;
    margin-right: 1rem;
  }
  
  .temp-details {
    display: flex;
    flex-direction: column;
    
    .feels-like {
      font-size: 0.9rem;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }
    
    .high-low {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;
      
      span {
        opacity: 0.9;
      }
    }
  }
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    width: 100px;
    height: 100px;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
  }
  
  .description {
    text-transform: capitalize;
    font-size: 1.1rem;
    margin-top: -10px;
  }
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }
  
  .label {
    font-size: 0.8rem;
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const CurrentWeather = ({ weather, location }) => {
  if (!weather) return null;

  const { main, weather: weatherInfo, wind, visibility, sys, dt } = weather;
  const { temp, feels_like, temp_min, temp_max, humidity, pressure } = main;

  return (
    <WeatherCard>
      <Header>
        <Location>
          <h2>{location?.city || weather.name}</h2>
          <p>{location?.country || sys.country}</p>
        </Location>
        <DateTime>{formatFullDate(dt)}</DateTime>
      </Header>

      <MainInfo>
        <Temperature>
          <span className="temp-value">{formatTemperature(temp)}</span>
          <div className="temp-details">
            <span className="feels-like">Feels like {formatTemperature(feels_like)}</span>
            <div className="high-low">
              <span>H: {formatTemperature(temp_max)}</span>
              <span>L: {formatTemperature(temp_min)}</span>
            </div>
          </div>
        </Temperature>

        <WeatherInfo>
          <img src={getWeatherIcon(weatherInfo[0].icon)} alt={weatherInfo[0].description} />
          <span className="description">{weatherInfo[0].description}</span>
        </WeatherInfo>
      </MainInfo>

      <Details>
        <DetailItem>
          <WiHumidity className="icon" />
          <span className="label">Humidity</span>
          <span className="value">{humidity}%</span>
        </DetailItem>

        <DetailItem>
          <WiStrongWind className="icon" />
          <span className="label">Wind</span>
          <span className="value">{Math.round(wind.speed * 3.6)} km/h {getWindDirection(wind.deg)}</span>
        </DetailItem>

        <DetailItem>
          <WiBarometer className="icon" />
          <span className="label">Pressure</span>
          <span className="value">{pressure} hPa</span>
        </DetailItem>

        <DetailItem>
          <MdVisibility className="icon" />
          <span className="label">Visibility</span>
          <span className="value">{(visibility / 1000).toFixed(1)} km</span>
        </DetailItem>
      </Details>
    </WeatherCard>
  );
};

export default CurrentWeather;
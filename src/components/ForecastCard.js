import React from 'react';
import styled from 'styled-components';
import { formatDate, formatTemperature, getWeatherIcon, groupForecastByDay } from '../utils/weatherUtils';

const ForecastContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  h3 {
    margin: 0 0 1.5rem 0;
    color: #333;
    font-weight: 500;
  }
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const DayCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1rem;
  color: white;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }
  
  .date {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;
  }
  
  .weather-icon {
    width: 60px;
    height: 60px;
    margin: 0.5rem auto;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  }
  
  .description {
    font-size: 0.85rem;
    opacity: 0.9;
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }
  
  .temps {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    
    .high {
      font-weight: 600;
    }
    
    .low {
      opacity: 0.8;
    }
  }
`;

const HourlyForecast = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f0f0f0;
  
  h4 {
    margin: 0 0 1rem 0;
    color: #333;
    font-weight: 500;
    font-size: 1.1rem;
  }
`;

const HourlyGrid = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
    
    &:hover {
      background: #555;
    }
  }
`;

const HourCard = styled.div`
  flex: 0 0 80px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  
  .time {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  .icon {
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }
  
  .temp {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-top: 0.5rem;
  }
`;

const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  const dailyForecast = groupForecastByDay(forecast.list);
  const next5Days = dailyForecast.slice(0, 5);
  const next24Hours = forecast.list.slice(0, 8);

  return (
    <ForecastContainer>
      <h3>5-Day Forecast</h3>
      <ForecastGrid>
        {next5Days.map((day, index) => (
          <DayCard key={day.date}>
            <div className="date">
              {index === 0 ? 'Today' : formatDate(day.items[0].dt)}
            </div>
            <img 
              className="weather-icon"
              src={getWeatherIcon(day.weather.icon)} 
              alt={day.weather.description}
            />
            <div className="description">{day.weather.main}</div>
            <div className="temps">
              <span className="high">{formatTemperature(day.maxTemp)}</span>
              <span className="low">{formatTemperature(day.minTemp)}</span>
            </div>
          </DayCard>
        ))}
      </ForecastGrid>

      <HourlyForecast>
        <h4>Next 24 Hours</h4>
        <HourlyGrid>
          {next24Hours.map((hour, index) => (
            <HourCard key={hour.dt}>
              <div className="time">
                {new Date(hour.dt * 1000).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </div>
              <img 
                className="icon"
                src={getWeatherIcon(hour.weather[0].icon)} 
                alt={hour.weather[0].description}
              />
              <div className="temp">{formatTemperature(hour.main.temp)}</div>
            </HourCard>
          ))}
        </HourlyGrid>
      </HourlyForecast>
    </ForecastContainer>
  );
};

export default ForecastCard;
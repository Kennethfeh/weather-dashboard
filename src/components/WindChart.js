import React from 'react';
import { Radar } from 'react-chartjs-2';
import styled from 'styled-components';
import { getWindDirection } from '../utils/weatherUtils';

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  
  h3 {
    margin: 0 0 1rem 0;
    color: #333;
    font-weight: 500;
  }
`;

const WindInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  
  .wind-stat {
    text-align: center;
    
    .label {
      font-size: 0.85rem;
      color: #666;
      margin-bottom: 0.25rem;
    }
    
    .value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
  }
`;

const WindChart = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Take first 8 data points for wind analysis
  const data = forecast.list.slice(0, 8);
  
  // Calculate wind direction distribution
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const windCounts = directions.reduce((acc, dir) => ({ ...acc, [dir]: 0 }), {});
  const windSpeeds = directions.reduce((acc, dir) => ({ ...acc, [dir]: [] }), {});
  
  data.forEach(item => {
    const dir = getWindDirection(item.wind.deg);
    const mainDir = dir.replace(/N|S|E|W/g, (match, offset) => {
      if (offset === 0) return match;
      return '';
    });
    
    const mappedDir = directions.find(d => mainDir.startsWith(d)) || 'N';
    windCounts[mappedDir]++;
    windSpeeds[mappedDir].push(item.wind.speed * 3.6); // Convert to km/h
  });
  
  // Calculate average speeds for each direction
  const avgSpeeds = {};
  directions.forEach(dir => {
    if (windSpeeds[dir].length > 0) {
      avgSpeeds[dir] = windSpeeds[dir].reduce((a, b) => a + b, 0) / windSpeeds[dir].length;
    } else {
      avgSpeeds[dir] = 0;
    }
  });
  
  const chartData = {
    labels: directions,
    datasets: [
      {
        label: 'Wind Speed (km/h)',
        data: directions.map(dir => avgSpeeds[dir]),
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        borderColor: '#667eea',
        borderWidth: 2,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#667eea'
      },
      {
        label: 'Frequency',
        data: directions.map(dir => windCounts[dir] * 5),
        backgroundColor: 'rgba(240, 147, 251, 0.2)',
        borderColor: '#f093fb',
        borderWidth: 2,
        pointBackgroundColor: '#f093fb',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#f093fb'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  // Calculate average and max wind speeds
  const allSpeeds = data.map(item => item.wind.speed * 3.6);
  const avgSpeed = (allSpeeds.reduce((a, b) => a + b, 0) / allSpeeds.length).toFixed(1);
  const maxSpeed = Math.max(...allSpeeds).toFixed(1);
  const currentDirection = data[0] ? getWindDirection(data[0].wind.deg) : 'N';

  return (
    <ChartContainer>
      <h3>Wind Analysis</h3>
      <div style={{ height: '250px' }}>
        <Radar data={chartData} options={options} />
      </div>
      <WindInfo>
        <div className="wind-stat">
          <div className="label">Current Direction</div>
          <div className="value">{currentDirection}</div>
        </div>
        <div className="wind-stat">
          <div className="label">Average Speed</div>
          <div className="value">{avgSpeed} km/h</div>
        </div>
        <div className="wind-stat">
          <div className="label">Max Speed</div>
          <div className="value">{maxSpeed} km/h</div>
        </div>
      </WindInfo>
    </ChartContainer>
  );
};

export default WindChart;
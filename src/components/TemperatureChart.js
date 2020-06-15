import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { formatTime } from '../utils/weatherUtils';

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

const TemperatureChart = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Take first 8 data points (24 hours)
  const data = forecast.list.slice(0, 8);
  
  const chartData = {
    labels: data.map(item => formatTime(item.dt)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(item => Math.round(item.main.temp)),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Feels Like (°C)',
        data: data.map(item => Math.round(item.main.feels_like)),
        borderColor: '#f093fb',
        backgroundColor: 'rgba(240, 147, 251, 0.1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#f093fb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4
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
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + '°C';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '°';
          }
        }
      }
    }
  };

  return (
    <ChartContainer>
      <h3>24-Hour Temperature Trend</h3>
      <div style={{ height: '250px' }}>
        <Line data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

export default TemperatureChart;
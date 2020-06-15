import React from 'react';
import { Bar } from 'react-chartjs-2';
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

const PrecipitationChart = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Take first 8 data points (24 hours)
  const data = forecast.list.slice(0, 8);
  
  const chartData = {
    labels: data.map(item => formatTime(item.dt)),
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: data.map(item => item.rain?.['3h'] || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Humidity (%)',
        data: data.map(item => item.main.humidity),
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'line',
        yAxisID: 'y1',
        pointRadius: 3,
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
        displayColors: true
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
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          },
          callback: function(value) {
            return value + ' mm';
          }
        },
        title: {
          display: true,
          text: 'Precipitation',
          font: {
            size: 11
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Humidity',
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <ChartContainer>
      <h3>Precipitation & Humidity</h3>
      <div style={{ height: '250px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </ChartContainer>
  );
};

export default PrecipitationChart;
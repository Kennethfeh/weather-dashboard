# Weather Dashboard

A modern React-based weather dashboard application that provides real-time weather information, forecasts, and detailed weather visualizations.

## Features

- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **Geolocation Support**: Automatically detect and display weather for your current location
- **5-Day Forecast**: View detailed weather predictions for the next 5 days
- **Interactive Charts**: 
  - Temperature trends with 24-hour visualization
  - Precipitation and humidity charts
  - Wind analysis with directional radar chart
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Search Functionality**: Search for weather by city name
- **Detailed Weather Metrics**: Temperature, humidity, wind speed, pressure, visibility, and more

## Technologies Used

- **React 17.0.1** - JavaScript library for building user interfaces
- **Chart.js 2.9.4** - For creating interactive weather charts
- **React Chart.js 2** - React wrapper for Chart.js
- **Styled Components** - For component-level styling
- **Axios** - For API requests
- **OpenWeatherMap API** - Weather data provider
- **date-fns** - For date formatting and manipulation
- **React Icons** - For weather icons and UI elements

## Prerequisites

- Node.js 12.x or higher (tested with Node.js 16-23)
- npm 6.x or higher
- OpenWeatherMap API key (free tier available)

## Troubleshooting

### Common Issues

**Dependency conflicts during installation:**
- Use `npm install --legacy-peer-deps` instead of `npm install`

**OpenSSL errors when starting the development server:**
- This occurs with newer Node.js versions (18+) due to legacy webpack configuration
- Use `NODE_OPTIONS=--openssl-legacy-provider npm run dev` to start the app

**API key errors:**
- Make sure you've created a `.env` file from `.env.example`
- Ensure your OpenWeatherMap API key is correctly set in the `.env` file
- Restart the development server after adding the API key

**Location services not working:**
- Make sure your browser allows location access for the application
- The app needs HTTPS or localhost to access geolocation APIs

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

> **Note**: Use the `--legacy-peer-deps` flag to resolve dependency conflicts between React 17 and older Chart.js packages.

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to the `.env` file:
```
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

You can get a free API key from [OpenWeatherMap](https://openweathermap.org/api).

## Available Scripts

### `npm start` or `npm run dev`
Runs the app in development mode.

If you encounter OpenSSL-related errors on newer Node.js versions, use:
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Usage

1. **Search for a City**: Use the search bar to enter any city name and press Enter or click the search button.

2. **Use Your Location**: Click the "Use My Location" button to automatically detect and display weather for your current location (requires browser permission).

3. **View Weather Data**: The dashboard displays:
   - Current temperature and "feels like" temperature
   - Weather conditions with visual icons
   - Detailed metrics (humidity, wind, pressure, visibility)
   - 5-day forecast with daily high/low temperatures
   - 24-hour temperature trend chart
   - Precipitation and humidity charts
   - Wind direction and speed analysis

## Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── CurrentWeather.js
│   │   ├── ForecastCard.js
│   │   ├── SearchBar.js
│   │   ├── TemperatureChart.js
│   │   ├── PrecipitationChart.js
│   │   ├── WindChart.js
│   │   ├── Loading.js
│   │   └── ErrorMessage.js
│   ├── services/
│   │   ├── weatherService.js
│   │   └── geolocationService.js
│   ├── utils/
│   │   └── weatherUtils.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## API Integration

This application uses the OpenWeatherMap API for weather data:
- Current Weather Data
- 5 Day / 3 Hour Forecast
- Air Quality Data (when available)

The application also uses OpenStreetMap's Nominatim API for reverse geocoding (converting coordinates to city names).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenWeatherMap for providing weather data API
- OpenStreetMap for geocoding services
- React community for excellent documentation and resources
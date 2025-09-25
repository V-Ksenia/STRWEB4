import React, { Component } from "react";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchWeather(this.props.tour.country);
  }

  async fetchWeather(country) {
    const API_KEY = "0895fd6658943ac688e7e5763de010b6"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      country
    )}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }
      const data = await response.json();
      this.setState({ weatherData: data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { weatherData, error } = this.state;

    return (
      <div>
        <h2>Weather in {this.props.tour.country}</h2>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {weatherData ? (
          <div>
            <p>
              <strong>Temperature:</strong> {weatherData.main.temp}°C
            </p>
            <p>
              <strong>Weather:</strong> {weatherData.weather[0].description}
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </p>
            <p>
              <strong>Wind speed:</strong> {weatherData.wind.speed} м/с
            </p>
          </div>
        ) : (
          !error && <p>Loading...</p>
        )}
      </div>
    );
  }
}

Weather.defaultProps = {
  tour: {
    country: "Poland", 
  },
};

export default Weather;

import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class Map extends Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      this.map = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(this.map);

      this.addMarkers();
    }
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  async getCoordinates(countryName) {
    const url = `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(
      countryName
    )}&format=json&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        console.error(`Coordinates for "${countryName}" not found.`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching coordinates for "${countryName}":`, error);
      return null;
    }
  }

  async addMarkers() {
    const { tour } = this.props;

    for (let index = 0; index < tour.length; index++) {
      const tourItem = tour[index];
      const coordinates = await this.getCoordinates(tourItem.country);

      if (coordinates) {
        if (index === 0) {
          this.map.setView([coordinates.lat, coordinates.lon], 5);
        }

        const marker = L.marker([coordinates.lat, coordinates.lon]).addTo(this.map);
        marker.bindPopup(`
          <b>${tourItem.hotelName}</b><br>
          ${tourItem.country}
        `);
      }
    }
  }

  render() {
    return (
      <div>
        <div
          id="map"
          style={{
            width: "700px",
            height: "400px",
            border: "1px solid #ccc",
          }}
        ></div>
      </div>
    );
  }
}

Map.defaultProps = {
  tour: [],
};

export default Map;

import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./BRICSAirQualityMap.css";

const countries = [
  {
    name: "Brazil",
    code: "BR",
    lat: -14.235,
    lng: -51.925,
    city: "Brasília",
    aqi: 42,

    metrics: [
      {
        name: "PM2.5 (Fine Particles)",
        current: "8.6 µg/m³",
        target: "< 10 µg/m³",
        status: "Optimal / Low Exposure",
        score: 94
      },
      {
        name: "PM10 (Coarse Dust)",
        current: "18.5 µg/m³",
        target: "< 20 µg/m³",
        status: "Safe / Stable",
        score: 90
      },
      {
        name: "Nitrogen Dioxide (NO₂)",
        current: "12.8 ppb",
        target: "< 25 ppb",
        status: "Compliant / Stable",
        score: 96
      },
      {
        name: "Sulfur Dioxide (SO₂)",
        current: "3.2 ppb",
        target: "< 10 ppb",
        status: "Ultra-Low Baseline",
        score: 98
      }
    ]
  },

  {
    name: "Russia",
    code: "RU",
    lat: 61.524,
    lng: 105.318,
    city: "Moscow",
    aqi: 58,

    metrics: [
      {
        name: "PM2.5 (Fine Particles)",
        current: "14.1 µg/m³",
        target: "< 10 µg/m³",
        status: "Moderate / Seasonal Variation",
        score: 82
      },
      {
        name: "PM10 (Coarse Dust)",
        current: "26.2 µg/m³",
        target: "< 20 µg/m³",
        status: "Moderate / Monitoring Required",
        score: 78
      },
      {
        name: "Nitrogen Dioxide (NO₂)",
        current: "20.4 ppb",
        target: "< 25 ppb",
        status: "Compliant / Stable",
        score: 88
      },
      {
        name: "Sulfur Dioxide (SO₂)",
        current: "5.3 ppb",
        target: "< 10 ppb",
        status: "Low Emission Baseline",
        score: 93
      }
    ]
  },

  {
    name: "India",
    code: "IN",
    lat: 20.593,
    lng: 78.962,
    city: "New Delhi",
    aqi: 145,

    metrics: [
      {
        name: "PM2.5 (Fine Particles)",
        current: "12.4 µg/m³",
        target: "< 10 µg/m³",
        status: "Optimal / 64% Cut",
        score: 92
      },
      {
        name: "PM10 (Coarse Dust)",
        current: "24.8 µg/m³",
        target: "< 20 µg/m³",
        status: "Safe / 52% Drop",
        score: 86
      },
      {
        name: "Nitrogen Dioxide (NO₂)",
        current: "18.2 ppb",
        target: "< 25 ppb",
        status: "Compliant / Stable",
        score: 95
      },
      {
        name: "Sulfur Dioxide (SO₂)",
        current: "4.1 ppb",
        target: "< 10 ppb",
        status: "Ultra-Low Baseline",
        score: 98
      }
    ]
  },

  {
    name: "China",
    code: "CN",
    lat: 35.861,
    lng: 104.195,
    city: "Beijing",
    aqi: 96,

    metrics: [
      {
        name: "PM2.5 (Fine Particles)",
        current: "16.8 µg/m³",
        target: "< 10 µg/m³",
        status: "Moderate / Improving",
        score: 80
      },
      {
        name: "PM10 (Coarse Dust)",
        current: "32.5 µg/m³",
        target: "< 20 µg/m³",
        status: "Moderate / Seasonal Dust",
        score: 74
      },
      {
        name: "Nitrogen Dioxide (NO₂)",
        current: "22.6 ppb",
        target: "< 25 ppb",
        status: "Compliant / Controlled",
        score: 86
      },
      {
        name: "Sulfur Dioxide (SO₂)",
        current: "6.2 ppb",
        target: "< 10 ppb",
        status: "Low Baseline",
        score: 91
      }
    ]
  },

  {
    name: "South Africa",
    code: "ZA",
    lat: -30.559,
    lng: 22.937,
    city: "Pretoria",
    aqi: 72,

    metrics: [
      {
        name: "PM2.5 (Fine Particles)",
        current: "13.2 µg/m³",
        target: "< 10 µg/m³",
        status: "Moderate / Controlled",
        score: 85
      },
      {
        name: "PM10 (Coarse Dust)",
        current: "27.4 µg/m³",
        target: "< 20 µg/m³",
        status: "Moderate / Monitoring Required",
        score: 80
      },
      {
        name: "Nitrogen Dioxide (NO₂)",
        current: "16.4 ppb",
        target: "< 25 ppb",
        status: "Compliant / Stable",
        score: 93
      },
      {
        name: "Sulfur Dioxide (SO₂)",
        current: "4.8 ppb",
        target: "< 10 ppb",
        status: "Ultra-Low Baseline",
        score: 96
      }
    ]
  }
];

const getAQIColor = (aqi) => {
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#eab308";
  if (aqi <= 150) return "#f97316";
  if (aqi <= 200) return "#ef4444";
  if (aqi <= 300) return "#9333ea";
  return "#7f1d1d";
};

const getAQILabel = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export default function BRICSAirQualityMap() {
  const [selectedCountry, setSelectedCountry] = useState(countries[2]);
  const mapRef = useRef(null);

  // Fix: Leaflet initializes before the CSS grid finishes laying out
  // .map-container, so it calculates the wrong size on first render.
  // invalidateSize() forces it to recheck its container dimensions.
  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keep the map correctly sized if the window/container is resized.
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="brics-map-section">
      <div className="container">
        <div className="text-center mb-40">
          <div className="badge-pill mb-16">
            <span className="badge-dot"></span>
            <span>Environmental Intelligence</span>
          </div>

          <h2 className="section-title">
            BRICS Air Quality Monitoring Map
          </h2>

          <p className="section-subtitle">
            Select a BRICS country to explore its atmospheric
            indicators and air quality parameters.
          </p>
        </div>

        <div className="brics-map-dashboard">
          {/* INTERACTIVE MAP */}
          <div className="map-container">
            <MapContainer
              center={[20, 40]}
              zoom={2}
              scrollWheelZoom={false}
              className="brics-map"
              ref={mapRef}
              whenReady={() => {
                if (mapRef.current) {
                  setTimeout(() => mapRef.current.invalidateSize(), 100);
                }
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {countries.map((country) => (
                <CircleMarker
                  key={country.code}
                  center={[country.lat, country.lng]}
                  radius={14}
                  pathOptions={{
                    fillColor: getAQIColor(country.aqi),
                    color: "#ffffff",
                    weight: 3,
                    fillOpacity: 0.9
                  }}
                  eventHandlers={{
                    click: () => setSelectedCountry(country)
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <h3>{country.name}</h3>
                      <p>
                        <strong>Monitoring City:</strong> {country.city}
                      </p>
                      <p>
                        <strong>AQI:</strong> {country.aqi}
                      </p>
                      <p>
                        <strong>Status:</strong> {getAQILabel(country.aqi)}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          {/* COUNTRY AIR QUALITY PANEL */}
          <div className="country-air-panel">
            <span className="panel-label">SELECTED BRICS COUNTRY</span>

            <h2>{selectedCountry.name}</h2>

            {/* AQI CARD */}
            <div
              className="selected-aqi"
              style={{ borderColor: getAQIColor(selectedCountry.aqi) }}
            >
              <span className="aqi-number">{selectedCountry.aqi}</span>
              <span className="aqi-text">Air Quality Index</span>
            </div>

            <div className="air-status">
              <span
                className="status-dot"
                style={{ background: getAQIColor(selectedCountry.aqi) }}
              />
              {getAQILabel(selectedCountry.aqi)}
            </div>

            {/* DYNAMIC AIR QUALITY METRICS */}
            <div className="country-metrics-list">
              {selectedCountry.metrics.map((metric, index) => (
                <div className="country-metric" key={index}>
                  <div className="metric-info-top">
                    <span className="metric-name">{metric.name}</span>
                    <span className="metric-val">{metric.current}</span>
                  </div>

                  <div className="metric-bar-bg">
                    <div
                      className="metric-bar-fill"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>

                  <div className="metric-info-bottom">
                    <span>Target: {metric.target}</span>
                    <span className="metric-status-badge">
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* COUNTRY INFORMATION */}
            <div className="country-info-grid">
              <div className="country-info-card">
                <span>Monitoring City</span>
                <strong>{selectedCountry.city}</strong>
              </div>

              <div className="country-info-card">
                <span>Country Code</span>
                <strong>{selectedCountry.code}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
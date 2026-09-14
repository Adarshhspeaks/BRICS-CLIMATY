import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
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
    lat: 55.7558,
    lng: 37.6173,
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
        status: "Moderate / Monitored",
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
    lat: 28.6139,
    lng: 77.209,
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
    lat: 39.9042,
    lng: 116.4074,
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
    lat: -25.7479,
    lng: 28.2293,
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
        status: "Moderate / Monitored",
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
  if (aqi <= 50) return "Good / Low Exposure";
  if (aqi <= 100) return "Moderate / Standard";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy / Active Action";
  if (aqi <= 300) return "Very Unhealthy / Alerts";
  return "Hazardous";
};

export default function BRICSAirQualityMap() {
  const [selectedCountry, setSelectedCountry] = useState(countries[2]);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Safety reset to prevent "Map container is already initialized"
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [selectedCountry.lat, selectedCountry.lng],
      zoom: 3,
      minZoom: 1.5,
      maxZoom: 18,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    mapRef.current = map;

    // Create markers
    const markers = {};
    countries.forEach((country) => {
      const isSelected = selectedCountry.code === country.code;
      const marker = L.circleMarker([country.lat, country.lng], {
        radius: isSelected ? 16 : 12,
        fillColor: getAQIColor(country.aqi),
        color: isSelected ? "#ffffff" : "#00140c",
        weight: isSelected ? 3.5 : 2,
        opacity: 1,
        fillOpacity: 0.92
      }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${country.name}</h4>
          <div style="color: #556960; font-size: 12px;"><strong>Monitoring City:</strong> ${country.city}</div>
          <div style="margin: 4px 0; font-size: 13px;"><strong>AQI:</strong> <span style="font-weight: 700; color: ${getAQIColor(country.aqi)}">${country.aqi}</span></div>
          <div style="color: #556960; font-size: 12px;"><strong>Status:</strong> ${getAQILabel(country.aqi)}</div>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        setSelectedCountry(country);
      });

      markers[country.code] = marker;
    });

    markersRef.current = markers;

    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 150);

    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update active marker & view whenever selectedCountry changes
  useEffect(() => {
    if (!mapRef.current || !selectedCountry) return;

    mapRef.current.flyTo([selectedCountry.lat, selectedCountry.lng], 4, {
      duration: 1.2,
      easeLinearity: 0.25
    });

    countries.forEach((c) => {
      const marker = markersRef.current[c.code];
      if (marker) {
        const isSelected = c.code === selectedCountry.code;
        marker.setStyle({
          radius: isSelected ? 16 : 12,
          color: isSelected ? "#ffffff" : "#00140c",
          weight: isSelected ? 3.5 : 2,
          fillColor: getAQIColor(c.aqi),
          fillOpacity: 0.92
        });
        if (isSelected) {
          marker.openPopup();
        }
      }
    });
  }, [selectedCountry]);

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
            Select a BRICS member state or click map markers to explore live atmospheric parameters and airshed indicators.
          </p>
        </div>

        <div className="brics-map-dashboard">
          {/* INTERACTIVE MAP */}
          <div className="map-container">
            <div ref={mapContainerRef} className="brics-map" />

            <div className="aqi-map-legend">
              <span className="legend-title">AQI Index</span>
              <div className="legend-scale">
                <span style={{ background: "#22c55e" }} title="Good (0-50)"></span>
                <span style={{ background: "#eab308" }} title="Moderate (51-100)"></span>
                <span style={{ background: "#f97316" }} title="Sensitive (101-150)"></span>
                <span style={{ background: "#ef4444" }} title="Unhealthy (151-200)"></span>
                <span style={{ background: "#9333ea" }} title="Very Unhealthy (201-300)"></span>
              </div>
              <div className="legend-range">
                <span>0 (Clean)</span>
                <span>300+</span>
              </div>
            </div>
          </div>

          {/* COUNTRY AIR QUALITY PANEL */}
          <div className="country-air-panel">
            <span className="panel-label">SELECTED BRICS NATION</span>

            <div className="panel-header-row">
              <h2>{selectedCountry.name}</h2>
              <span className="country-code-pill">{selectedCountry.code}</span>
            </div>

            {/* AQI CARD */}
            <div
              className="selected-aqi"
              style={{ borderColor: getAQIColor(selectedCountry.aqi) }}
            >
              <span className="aqi-number">{selectedCountry.aqi}</span>
              <span className="aqi-text">Air Quality Index (AQI)</span>
            </div>

            <div className="air-status">
              <span
                className="status-dot"
                style={{ background: getAQIColor(selectedCountry.aqi) }}
              />
              <span>{getAQILabel(selectedCountry.aqi)}</span>
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
                <span>Monitoring Station</span>
                <strong>{selectedCountry.city}</strong>
              </div>

              <div className="country-info-card">
                <span>Framework Status</span>
                <strong className="text-green">Active CACR</strong>
              </div>
            </div>

            {/* COUNTRY SWITCHER */}
            <div className="aqi-country-switcher">
              {countries.map((c) => (
                <button
                  key={c.code}
                  className={`aqi-switch-btn ${
                    selectedCountry.code === c.code ? "active" : ""
                  }`}
                  onClick={() => setSelectedCountry(c)}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  BRICS_COUNTRIES,
  fetchAllBricsAirQuality,
  getAQIColor,
  getAQILabel
} from "../lib/bricsApi";
import "./BRICSAirQualityMap.css";

export default function BRICSAirQualityMap() {
  const [selectedCode, setSelectedCode] = useState("IN");
  const [airQualityData, setAirQualityData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Fetch live air quality data from Open-Meteo
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchAllBricsAirQuality();
        if (isMounted) {
          setAirQualityData(data);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.error("Failed to load live air quality data:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const activeCountry =
    airQualityData[selectedCode] ||
    BRICS_COUNTRIES.find((c) => c.code === selectedCode) ||
    BRICS_COUNTRIES[2];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    const currentActive = BRICS_COUNTRIES.find((c) => c.code === selectedCode) || BRICS_COUNTRIES[2];

    const map = L.map(mapContainerRef.current, {
      center: [currentActive.lat, currentActive.lng],
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

    // Create markers for all 10 BRICS countries
    const markers = {};
    BRICS_COUNTRIES.forEach((c) => {
      const data = airQualityData[c.code] || c;
      const aqi = data.aqi ?? 50;
      const isSelected = selectedCode === c.code;

      const marker = L.circleMarker([c.lat, c.lng], {
        radius: isSelected ? 16 : 12,
        fillColor: getAQIColor(aqi),
        color: isSelected ? "#ffffff" : "#00140c",
        weight: isSelected ? 3.5 : 2,
        opacity: 1,
        fillOpacity: 0.92
      }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${c.flag} ${c.name}</h4>
          <div style="color: #556960; font-size: 12px;"><strong>Monitoring Capital:</strong> ${c.city}</div>
          <div style="margin: 4px 0; font-size: 13px;"><strong>Live AQI:</strong> <span style="font-weight: 700; color: ${getAQIColor(aqi)}">${aqi}</span></div>
          <div style="color: #556960; font-size: 12px;"><strong>Status:</strong> ${getAQILabel(aqi)}</div>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        setSelectedCode(c.code);
      });

      markers[c.code] = marker;
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

  // Update markers when airQualityData or selectedCode changes
  useEffect(() => {
    if (!mapRef.current) return;

    BRICS_COUNTRIES.forEach((c) => {
      const marker = markersRef.current[c.code];
      if (marker) {
        const data = airQualityData[c.code] || c;
        const aqi = data.aqi ?? 50;
        const isSelected = c.code === selectedCode;

        marker.setStyle({
          radius: isSelected ? 16 : 12,
          color: isSelected ? "#ffffff" : "#00140c",
          weight: isSelected ? 3.5 : 2,
          fillColor: getAQIColor(aqi),
          fillOpacity: 0.92
        });

        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
            <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${c.flag} ${c.name}</h4>
            <div style="color: #556960; font-size: 12px;"><strong>Monitoring Capital:</strong> ${c.city}</div>
            <div style="margin: 4px 0; font-size: 13px;"><strong>Live AQI:</strong> <span style="font-weight: 700; color: ${getAQIColor(aqi)}">${aqi}</span></div>
            <div style="color: #556960; font-size: 12px;"><strong>Status:</strong> ${getAQILabel(aqi)}</div>
          </div>
        `;
        marker.setPopupContent(popupContent);

        if (isSelected) {
          marker.openPopup();
        }
      }
    });
  }, [airQualityData, selectedCode]);

  // Pan to selected country
  const handleCountrySelect = (c) => {
    setSelectedCode(c.code);
    if (mapRef.current) {
      mapRef.current.flyTo([c.lat, c.lng], 4, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  };

  const aqiScore = activeCountry.aqi ?? 50;
  const metrics = activeCountry.metrics || [
    { name: "PM2.5 (Fine Particles)", current: "12.0 µg/m³", target: "< 10 µg/m³", status: "Optimal Baseline", score: 90 },
    { name: "PM10 (Coarse Dust)", current: "24.0 µg/m³", target: "< 20 µg/m³", status: "Safe / Stable", score: 85 },
    { name: "Nitrogen Dioxide (NO₂)", current: "18.0 ppb", target: "< 25 ppb", status: "Compliant", score: 92 },
    { name: "Sulfur Dioxide (SO₂)", current: "4.0 ppb", target: "< 10 ppb", status: "Ultra-Low Baseline", score: 96 }
  ];

  return (
    <section className="brics-map-section">
      <div className="container">
        <div className="text-center mb-40">
          <div className="badge-pill mb-16">
            <span className="badge-dot pulse-green"></span>
            <span>Live Telemetry • Open-Meteo Clean Air Feed</span>
          </div>

          <h2 className="section-title">
            BRICS 10-Nation Air Quality Observatory
          </h2>

          <p className="section-subtitle">
            Real-time atmospheric monitoring, particulate concentrations (PM2.5, PM10), and gaseous pollutant baselines across all BRICS capitals.
          </p>

          {lastUpdated && (
            <div className="live-sync-indicator">
              <span className="live-pulse-dot"></span>
              <span>Live Sensor Sync: <strong>{lastUpdated}</strong> (Updated every 5 min)</span>
            </div>
          )}
        </div>

        {/* 10-NATION SELECTOR PILLS */}
        <div className="brics-selector-pills-row">
          {BRICS_COUNTRIES.map((c) => {
            const data = airQualityData[c.code];
            const isSelected = selectedCode === c.code;
            const countryAqi = data?.aqi;
            return (
              <button
                key={c.code}
                className={`brics-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleCountrySelect(c)}
              >
                <span className="pill-flag">{c.flag}</span>
                <span className="pill-name">{c.name}</span>
                {countryAqi !== undefined && (
                  <span
                    className="pill-aqi-badge"
                    style={{ background: getAQIColor(countryAqi) }}
                  >
                    {countryAqi}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="brics-map-dashboard">
          {/* INTERACTIVE MAP */}
          <div className="map-container">
            <div ref={mapContainerRef} className="brics-map" />

            <div className="aqi-map-legend">
              <span className="legend-title">US AQI Standard</span>
              <div className="legend-scale">
                <span style={{ background: "#22c55e" }} title="Good (0-50)"></span>
                <span style={{ background: "#eab308" }} title="Moderate (51-100)"></span>
                <span style={{ background: "#f97316" }} title="Sensitive (101-150)"></span>
                <span style={{ background: "#ef4444" }} title="Unhealthy (151-200)"></span>
                <span style={{ background: "#8b5cf6" }} title="Very Unhealthy (201-300)"></span>
                <span style={{ background: "#7f1d1d" }} title="Hazardous (300+)"></span>
              </div>
              <div className="legend-range">
                <span>0 (Clean)</span>
                <span>300+ (Hazardous)</span>
              </div>
            </div>
          </div>

          {/* COUNTRY AIR QUALITY PANEL */}
          <div className="country-air-panel">
            <div className="panel-top-badge">
              <span className="panel-label">MONITORING STATION</span>
              {loading && <span className="panel-refresh-badge">Refreshing...</span>}
            </div>

            <div className="panel-header-row">
              <h2>
                <span className="flag-icon">{activeCountry.flag}</span> {activeCountry.name}
              </h2>
              <span className="country-code-pill">{activeCountry.code}</span>
            </div>

            {/* AQI CARD */}
            <div
              className="selected-aqi"
              style={{ borderColor: getAQIColor(aqiScore) }}
            >
              <span className="aqi-number" style={{ color: getAQIColor(aqiScore) }}>
                {aqiScore}
              </span>
              <span className="aqi-text">Live Air Quality Index (US AQI)</span>
            </div>

            <div className="air-status">
              <span
                className="status-dot"
                style={{ background: getAQIColor(aqiScore) }}
              />
              <span style={{ fontWeight: 600 }}>{getAQILabel(aqiScore)}</span>
            </div>

            {/* DYNAMIC AIR QUALITY METRICS */}
            <div className="country-metrics-list">
              {metrics.map((metric, index) => (
                <div className="country-metric" key={index}>
                  <div className="metric-info-top">
                    <span className="metric-name">{metric.name}</span>
                    <span className="metric-val">{metric.current}</span>
                  </div>

                  <div className="metric-bar-bg">
                    <div
                      className="metric-bar-fill"
                      style={{
                        width: `${metric.score}%`,
                        background: getAQIColor(aqiScore)
                      }}
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
                <span>Capital City</span>
                <strong>{activeCountry.city}</strong>
              </div>

              <div className="country-info-card">
                <span>Region & Telemetry</span>
                <strong className="text-green">Live Open-Meteo</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
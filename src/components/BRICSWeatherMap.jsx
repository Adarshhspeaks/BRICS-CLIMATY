import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  BRICS_COUNTRIES,
  fetchAllBricsWeather,
  getWeatherInfo,
  getTempColor
} from "../lib/bricsApi";
import "./BRICSWeatherMap.css";

export default function BRICSWeatherMap() {
  const [selectedCode, setSelectedCode] = useState("IN");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Fetch live weather data asynchronously from Open-Meteo
  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setLoading(true);
        const data = await fetchAllBricsWeather();
        if (isMounted) {
          setWeatherData(data);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      } catch (err) {
        console.error("Live weather fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAll();
    const interval = setInterval(loadAll, 5 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const activeCountry =
    weatherData[selectedCode] ||
    BRICS_COUNTRIES.find((c) => c.code === selectedCode) ||
    BRICS_COUNTRIES[2];

  // Initialize Map safely
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
      const data = weatherData[c.code] || c;
      const isSelected = selectedCode === c.code;
      const temp = data?.current?.temp ?? 25;
      const weatherInfo = data?.current
        ? getWeatherInfo(data.current.weatherCode)
        : { label: "Clear", icon: "🌤️" };

      const marker = L.circleMarker([c.lat, c.lng], {
        radius: isSelected ? 16 : 12,
        fillColor: getTempColor(temp),
        color: isSelected ? "#ffffff" : "#00140c",
        weight: isSelected ? 3.5 : 2,
        opacity: 1,
        fillOpacity: 0.92
      }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${c.flag} ${c.name}</h4>
          <div style="color: #556960; font-size: 12px;"><strong>Capital:</strong> ${c.city}</div>
          <div style="margin: 4px 0; font-size: 13px;"><strong>Temp:</strong> <span style="font-weight: 700;">${Math.round(temp)}°C</span> (${weatherInfo.icon} ${weatherInfo.label})</div>
          <div style="color: #556960; font-size: 12px;"><strong>Humidity:</strong> ${Math.round(data?.current?.humidity ?? 55)}%</div>
          <div style="color: #556960; font-size: 12px;"><strong>Wind:</strong> ${data?.current?.windSpeed ?? 10} km/h</div>
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

  // Update marker styles when weatherData or selectedCode changes
  useEffect(() => {
    if (!mapRef.current) return;

    BRICS_COUNTRIES.forEach((c) => {
      const marker = markersRef.current[c.code];
      if (marker) {
        const data = weatherData[c.code] || c;
        const temp = data?.current?.temp ?? 25;
        const isSelected = selectedCode === c.code;
        const weatherInfo = data?.current
          ? getWeatherInfo(data.current.weatherCode)
          : { label: "Clear", icon: "🌤️" };

        marker.setStyle({
          radius: isSelected ? 16 : 12,
          color: isSelected ? "#ffffff" : "#00140c",
          weight: isSelected ? 3.5 : 2,
          fillColor: getTempColor(temp),
          fillOpacity: 0.92
        });

        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
            <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${c.flag} ${c.name}</h4>
            <div style="color: #556960; font-size: 12px;"><strong>Capital:</strong> ${c.city}</div>
            <div style="margin: 4px 0; font-size: 13px;"><strong>Temp:</strong> <span style="font-weight: 700;">${Math.round(temp)}°C</span> (${weatherInfo.icon} ${weatherInfo.label})</div>
            <div style="color: #556960; font-size: 12px;"><strong>Humidity:</strong> ${Math.round(data?.current?.humidity ?? 55)}%</div>
            <div style="color: #556960; font-size: 12px;"><strong>Wind:</strong> ${data?.current?.windSpeed ?? 10} km/h</div>
          </div>
        `;
        marker.setPopupContent(popupContent);

        if (isSelected) {
          marker.openPopup();
        }
      }
    });
  }, [weatherData, selectedCode]);

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

  const currentWeather = activeCountry.current || {
    temp: 25,
    humidity: 55,
    windSpeed: 10,
    weatherCode: 1
  };
  const weatherInfo = getWeatherInfo(currentWeather.weatherCode);
  const dailyForecast = activeCountry.daily || [];

  return (
    <section className="brics-weather-section">
      <div className="container">
        <div className="text-center mb-40">
          <div className="badge-pill mb-16">
            <span className="badge-dot pulse-blue"></span>
            <span>Live Meteorological Telemetry • Open-Meteo Satellite Feed</span>
          </div>

          <h2 className="section-title">
            BRICS 10-Nation Climate & Weather Radar
          </h2>

          <p className="section-subtitle">
            Real-time thermal observations, wind vectors, atmospheric moisture, and 7-day predictive models across all BRICS capitals.
          </p>

          {lastUpdated && (
            <div className="live-sync-indicator">
              <span className="live-pulse-dot pulse-blue-dot"></span>
              <span>Live Satellite Sync: <strong>{lastUpdated}</strong> (Updated every 5 min)</span>
            </div>
          )}
        </div>

        {/* 10-NATION SELECTOR PILLS */}
        <div className="brics-selector-pills-row">
          {BRICS_COUNTRIES.map((c) => {
            const data = weatherData[c.code];
            const isSelected = selectedCode === c.code;
            const temp = data?.current?.temp;
            return (
              <button
                key={c.code}
                className={`brics-pill-btn ${isSelected ? "active" : ""}`}
                onClick={() => handleCountrySelect(c)}
              >
                <span className="pill-flag">{c.flag}</span>
                <span className="pill-name">{c.name}</span>
                {temp !== undefined && (
                  <span
                    className="pill-temp-badge"
                    style={{ background: getTempColor(temp) }}
                  >
                    {Math.round(temp)}°C
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="brics-weather-dashboard">
          {/* MAP */}
          <div className="weather-map-container">
            <div ref={mapContainerRef} className="brics-weather-map" />

            <div className="weather-temp-legend">
              <span className="legend-title">Temperature Scale</span>
              <div className="legend-scale">
                <span style={{ background: "#3b82f6" }} title="Below 0°C (Freezing)"></span>
                <span style={{ background: "#38bdf8" }} title="0 - 15°C (Cool)"></span>
                <span style={{ background: "#22c55e" }} title="15 - 25°C (Mild)"></span>
                <span style={{ background: "#eab308" }} title="25 - 32°C (Warm)"></span>
                <span style={{ background: "#f97316" }} title="32 - 38°C (Hot)"></span>
                <span style={{ background: "#ef4444" }} title="38°C+ (Extreme Heat)"></span>
              </div>
              <div className="legend-range">
                <span>&lt; 0°C (Cold)</span>
                <span>40°C+ (Hot)</span>
              </div>
            </div>
          </div>

          {/* WEATHER DATA PANEL */}
          <div className="weather-panel">
            <div className="panel-top-badge">
              <span className="panel-label">METEOROLOGICAL STATION</span>
              {loading && <span className="panel-refresh-badge">Refreshing...</span>}
            </div>

            <div className="weather-panel-header">
              <h2>
                <span className="flag-icon">{activeCountry.flag}</span> {activeCountry.name}
              </h2>
              <span className="country-code-pill">{activeCountry.code}</span>
            </div>

            {/* CURRENT WEATHER HERO */}
            <div className="weather-hero-card">
              <div className="weather-icon-temp">
                <span className="weather-emoji">{weatherInfo.icon}</span>
                <span
                  className="weather-temp-num"
                  style={{ color: getTempColor(currentWeather.temp) }}
                >
                  {Math.round(currentWeather.temp)}°C
                </span>
              </div>
              <div className="weather-condition-text">
                <strong>{weatherInfo.label}</strong>
                <span>Capital: {activeCountry.city}</span>
              </div>
            </div>

            {/* CURRENT STATS GRID */}
            <div className="weather-metrics-grid">
              <div className="weather-stat-box">
                <span className="stat-label">Relative Humidity</span>
                <span className="stat-value">{Math.round(currentWeather.humidity)}%</span>
              </div>
              <div className="weather-stat-box">
                <span className="stat-label">Wind Speed</span>
                <span className="stat-value">{currentWeather.windSpeed} km/h</span>
              </div>
              <div className="weather-stat-box">
                <span className="stat-label">Day / Night Cycle</span>
                <span className="stat-value">{currentWeather.isDay ? "☀️ Daytime" : "🌙 Nighttime"}</span>
              </div>
              <div className="weather-stat-box">
                <span className="stat-label">Data Feed</span>
                <span className="stat-value text-green">Live Satellite</span>
              </div>
            </div>

            {/* 7-DAY FORECAST */}
            <div className="forecast-container">
              <span className="forecast-title">7-Day Predictive Climate Model</span>
              <div className="forecast-list">
                {dailyForecast.map((day, idx) => {
                  const dayInfo = getWeatherInfo(day.weatherCode);
                  const dayLabel = idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : new Date(day.date).toLocaleDateString("en-US", { weekday: "short" });
                  return (
                    <div className="forecast-row" key={idx}>
                      <span className="forecast-day">{dayLabel}</span>
                      <span className="forecast-icon">{dayInfo.icon}</span>
                      <span className="forecast-desc">{dayInfo.label}</span>
                      <div className="forecast-temps">
                        <span className="temp-high">{Math.round(day.high)}°</span>
                        <span className="temp-low">{Math.round(day.low)}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
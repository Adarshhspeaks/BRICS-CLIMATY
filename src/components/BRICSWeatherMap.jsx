import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./BRICSWeatherMap.css";

const countries = [
  {
    name: "Brazil",
    code: "BR",
    lat: -15.7939,
    lng: -47.8828,
    city: "Brasília"
  },
  {
    name: "Russia",
    code: "RU",
    lat: 55.7558,
    lng: 37.6173,
    city: "Moscow"
  },
  {
    name: "India",
    code: "IN",
    lat: 28.6139,
    lng: 77.2090,
    city: "New Delhi"
  },
  {
    name: "China",
    code: "CN",
    lat: 39.9042,
    lng: 116.4074,
    city: "Beijing"
  },
  {
    name: "South Africa",
    code: "ZA",
    lat: -25.7479,
    lng: 28.2293,
    city: "Pretoria"
  }
];

// WMO weather code -> human label + simple icon glyph
// https://open-meteo.com/en/docs (weather_code field)
const WEATHER_CODE_MAP = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing Rime Fog", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Dense Drizzle", icon: "🌧️" },
  61: { label: "Slight Rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  71: { label: "Slight Snow", icon: "🌨️" },
  73: { label: "Snow", icon: "🌨️" },
  75: { label: "Heavy Snow", icon: "❄️" },
  80: { label: "Rain Showers", icon: "🌦️" },
  81: { label: "Rain Showers", icon: "🌧️" },
  82: { label: "Violent Showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm w/ Hail", icon: "⛈️" },
  99: { label: "Severe Thunderstorm", icon: "⛈️" }
};

const getWeatherInfo = (code) =>
  WEATHER_CODE_MAP[code] || { label: "Unknown", icon: "❔" };

// Marker color follows current temperature, in °C
const getTempColor = (tempC) => {
  if (tempC === null || tempC === undefined) return "#94a3b8";
  if (tempC <= 0) return "#3b82f6";
  if (tempC <= 15) return "#38bdf8";
  if (tempC <= 25) return "#22c55e";
  if (tempC <= 32) return "#eab308";
  if (tempC <= 38) return "#f97316";
  return "#ef4444";
};

async function fetchCountryWeather(country) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${country.lat}` +
    `&longitude=${country.lng}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&forecast_days=5&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather request failed for ${country.name}`);
  }
  const data = await res.json();

  return {
    ...country,
    current: {
      temp: data.current.temperature_2m,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      isDay: data.current.is_day === 1,
      weatherCode: data.current.weather_code
    },
    daily: data.daily.time.map((date, i) => ({
      date,
      high: data.daily.temperature_2m_max[i],
      low: data.daily.temperature_2m_min[i],
      weatherCode: data.daily.weather_code[i]
    }))
  };
}

export default function BRICSWeatherMap() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCode, setSelectedCode] = useState("IN");
  const mapRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      setLoading(true);
      setError(null);

      const results = await Promise.allSettled(
        countries.map((c) => fetchCountryWeather(c))
      );

      if (!isMounted) return;

      const byCode = {};
      let anySucceeded = false;

      results.forEach((result, i) => {
        const code = countries[i].code;
        if (result.status === "fulfilled") {
          byCode[code] = result.value;
          anySucceeded = true;
        } else {
          byCode[code] = { ...countries[i], fetchFailed: true };
        }
      });

      setWeatherData(byCode);
      if (!anySucceeded) {
        setError("Unable to load live weather data right now.");
      }
      setLoading(false);
    }

    loadAll();

    // Refresh every 15 minutes
    const interval = setInterval(loadAll, 15 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => mapRef.current.invalidateSize(), 200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) mapRef.current.invalidateSize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selected = weatherData[selectedCode];

  return (
    <div className="brics-weather-dashboard">
      {/* MAP */}
      <div className="weather-map-container">
        <MapContainer
          center={[20, 40]}
          zoom={2}
          scrollWheelZoom={false}
          className="brics-weather-map"
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

          {countries.map((country) => {
            const data = weatherData[country.code];
            const temp = data?.current?.temp;
            const info = data?.current
              ? getWeatherInfo(data.current.weatherCode)
              : null;

            return (
              <CircleMarker
                key={country.code}
                center={[country.lat, country.lng]}
                radius={14}
                pathOptions={{
                  fillColor: getTempColor(temp),
                  color: "#ffffff",
                  weight: 3,
                  fillOpacity: 0.92
                }}
                eventHandlers={{
                  click: () => setSelectedCode(country.code)
                }}
              >
                <Popup>
                  <div className="weather-map-popup">
                    <h3>{country.name}</h3>
                    <p>
                      <strong>City:</strong> {country.city}
                    </p>
                    {data?.current ? (
                      <>
                        <p>
                          <strong>Temp:</strong>{" "}
                          {Math.round(data.current.temp)}°C
                        </p>
                        <p>
                          <strong>Condition:</strong> {info.icon}{" "}
                          {info.label}
                        </p>
                      </>
                    ) : (
                      <p className="popup-loading">Loading weather…</p>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <div className="weather-map-legend">
          <span className="legend-title">Temp (°C)</span>
          <div className="legend-scale">
            <span style={{ background: "#3b82f6" }}></span>
            <span style={{ background: "#38bdf8" }}></span>
            <span style={{ background: "#22c55e" }}></span>
            <span style={{ background: "#eab308" }}></span>
            <span style={{ background: "#f97316" }}></span>
            <span style={{ background: "#ef4444" }}></span>
          </div>
          <div className="legend-range">
            <span>≤0</span>
            <span>38+</span>
          </div>
        </div>
      </div>

      {/* SELECTED COUNTRY PANEL */}
      <div className="weather-country-panel">
        <span className="panel-label">LIVE CONDITIONS</span>

        {loading && !selected && (
          <div className="weather-loading-state">
            <div className="weather-spinner" />
            <p>Fetching live weather…</p>
          </div>
        )}

        {error && !selected?.current && (
          <p className="weather-error-state">{error}</p>
        )}

        {selected && (
          <>
            <h2>{selected.name}</h2>

            {selected.current ? (
              <>
                <div
                  className="current-weather-card"
                  style={{
                    borderColor: getTempColor(selected.current.temp)
                  }}
                >
                  <span className="weather-icon-big">
                    {getWeatherInfo(selected.current.weatherCode).icon}
                  </span>
                  <span className="temp-number">
                    {Math.round(selected.current.temp)}°C
                  </span>
                  <span className="temp-condition">
                    {getWeatherInfo(selected.current.weatherCode).label}
                  </span>
                </div>

                <div className="weather-meta-grid">
                  <div className="weather-meta-card">
                    <span>Humidity</span>
                    <strong>{Math.round(selected.current.humidity)}%</strong>
                  </div>
                  <div className="weather-meta-card">
                    <span>Wind Speed</span>
                    <strong>
                      {Math.round(selected.current.windSpeed)} km/h
                    </strong>
                  </div>
                  <div className="weather-meta-card">
                    <span>Monitoring City</span>
                    <strong>{selected.city}</strong>
                  </div>
                  <div className="weather-meta-card">
                    <span>Country Code</span>
                    <strong>{selected.code}</strong>
                  </div>
                </div>

                {selected.daily && (
                  <div className="weather-forecast-strip">
                    <span className="forecast-title">5-Day Outlook</span>
                    <div className="forecast-days">
                      {selected.daily.map((day) => {
                        const d = new Date(day.date);
                        const label = d.toLocaleDateString(undefined, {
                          weekday: "short"
                        });
                        const dayInfo = getWeatherInfo(day.weatherCode);
                        return (
                          <div className="forecast-day" key={day.date}>
                            <span className="forecast-day-label">
                              {label}
                            </span>
                            <span className="forecast-day-icon">
                              {dayInfo.icon}
                            </span>
                            <span className="forecast-day-high">
                              {Math.round(day.high)}°
                            </span>
                            <span className="forecast-day-low">
                              {Math.round(day.low)}°
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="weather-error-state">
                Live weather is currently unavailable for {selected.name}.
              </p>
            )}
          </>
        )}

        <div className="weather-country-switcher">
          {countries.map((c) => (
            <button
              key={c.code}
              className={`weather-switch-btn ${
                selectedCode === c.code ? "active" : ""
              }`}
              onClick={() => setSelectedCode(c.code)}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
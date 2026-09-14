import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
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
    lng: 77.209,
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
  WEATHER_CODE_MAP[code] || { label: "Clear / Mild", icon: "🌤️" };

const getTempColor = (tempC) => {
  if (tempC === null || tempC === undefined) return "#0b8e58";
  if (tempC <= 0) return "#3b82f6";
  if (tempC <= 15) return "#38bdf8";
  if (tempC <= 25) return "#22c55e";
  if (tempC <= 32) return "#eab308";
  if (tempC <= 38) return "#f97316";
  return "#ef4444";
};

const fallbackWeatherData = {
  BR: {
    name: "Brazil",
    code: "BR",
    lat: -15.7939,
    lng: -47.8828,
    city: "Brasília",
    current: { temp: 26.5, humidity: 62, windSpeed: 11.2, isDay: true, weatherCode: 1 },
    daily: [
      { date: "2026-09-14", high: 28, low: 18, weatherCode: 1 },
      { date: "2026-09-15", high: 29, low: 19, weatherCode: 2 },
      { date: "2026-09-16", high: 27, low: 18, weatherCode: 80 },
      { date: "2026-09-17", high: 28, low: 17, weatherCode: 1 },
      { date: "2026-09-18", high: 30, low: 19, weatherCode: 0 }
    ]
  },
  RU: {
    name: "Russia",
    code: "RU",
    lat: 55.7558,
    lng: 37.6173,
    city: "Moscow",
    current: { temp: 16.2, humidity: 58, windSpeed: 8.4, isDay: true, weatherCode: 2 },
    daily: [
      { date: "2026-09-14", high: 17, low: 9, weatherCode: 2 },
      { date: "2026-09-15", high: 18, low: 10, weatherCode: 1 },
      { date: "2026-09-16", high: 16, low: 8, weatherCode: 3 },
      { date: "2026-09-17", high: 15, low: 7, weatherCode: 61 },
      { date: "2026-09-18", high: 16, low: 8, weatherCode: 2 }
    ]
  },
  IN: {
    name: "India",
    code: "IN",
    lat: 28.6139,
    lng: 77.209,
    city: "New Delhi",
    current: { temp: 29.8, humidity: 74, windSpeed: 9.6, isDay: true, weatherCode: 51 },
    daily: [
      { date: "2026-09-14", high: 33, low: 26, weatherCode: 51 },
      { date: "2026-09-15", high: 31, low: 25, weatherCode: 95 },
      { date: "2026-09-16", high: 32, low: 25, weatherCode: 53 },
      { date: "2026-09-17", high: 34, low: 26, weatherCode: 2 },
      { date: "2026-09-18", high: 33, low: 25, weatherCode: 95 }
    ]
  },
  CN: {
    name: "China",
    code: "CN",
    lat: 39.9042,
    lng: 116.4074,
    city: "Beijing",
    current: { temp: 24.1, humidity: 55, windSpeed: 10.1, isDay: true, weatherCode: 0 },
    daily: [
      { date: "2026-09-14", high: 26, low: 15, weatherCode: 0 },
      { date: "2026-09-15", high: 27, low: 16, weatherCode: 1 },
      { date: "2026-09-16", high: 25, low: 14, weatherCode: 2 },
      { date: "2026-09-17", high: 24, low: 15, weatherCode: 3 },
      { date: "2026-09-18", high: 26, low: 16, weatherCode: 1 }
    ]
  },
  ZA: {
    name: "South Africa",
    code: "ZA",
    lat: -25.7479,
    lng: 28.2293,
    city: "Pretoria",
    current: { temp: 21.4, humidity: 48, windSpeed: 13.5, isDay: true, weatherCode: 1 },
    daily: [
      { date: "2026-09-14", high: 23, low: 11, weatherCode: 1 },
      { date: "2026-09-15", high: 24, low: 12, weatherCode: 0 },
      { date: "2026-09-16", high: 22, low: 10, weatherCode: 2 },
      { date: "2026-09-17", high: 23, low: 11, weatherCode: 1 },
      { date: "2026-09-18", high: 25, low: 12, weatherCode: 0 }
    ]
  }
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
  const [weatherData, setWeatherData] = useState(fallbackWeatherData);
  const [loading, setLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState("IN");

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

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

    const activeCountry = countries.find((c) => c.code === selectedCode) || countries[2];

    const map = L.map(mapContainerRef.current, {
      center: [activeCountry.lat, activeCountry.lng],
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
      const data = weatherData[country.code] || fallbackWeatherData[country.code];
      const isSelected = selectedCode === country.code;
      const info = data?.current
        ? getWeatherInfo(data.current.weatherCode)
        : { label: "Clear", icon: "🌤️" };

      const marker = L.circleMarker([country.lat, country.lng], {
        radius: isSelected ? 16 : 12,
        fillColor: getTempColor(data?.current?.temp),
        color: isSelected ? "#ffffff" : "#00140c",
        weight: isSelected ? 3.5 : 2,
        opacity: 1,
        fillOpacity: 0.92
      }).addTo(map);

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; padding: 4px;">
          <h4 style="margin: 0 0 4px; font-weight: 700; color: #00140c; font-size: 15px;">${country.name}</h4>
          <div style="color: #556960; font-size: 12px;"><strong>Capital:</strong> ${country.city}</div>
          <div style="margin: 4px 0; font-size: 13px;"><strong>Temp:</strong> <span style="font-weight: 700;">${Math.round(data?.current?.temp ?? 25)}°C</span> (${info.icon} ${info.label})</div>
          <div style="color: #556960; font-size: 12px;"><strong>Humidity:</strong> ${Math.round(data?.current?.humidity ?? 60)}%</div>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        setSelectedCode(country.code);
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

  // Fetch live weather data asynchronously
  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setLoading(true);
        const results = await Promise.allSettled(
          countries.map((c) => fetchCountryWeather(c))
        );

        if (!isMounted) return;

        const byCode = {};
        results.forEach((result, i) => {
          const code = countries[i].code;
          if (result.status === "fulfilled" && result.value) {
            byCode[code] = result.value;
          } else {
            byCode[code] = fallbackWeatherData[code];
          }
        });

        setWeatherData((prev) => ({ ...prev, ...byCode }));
      } catch {
        // Retain fallback data gracefully
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAll();

    const interval = setInterval(loadAll, 15 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Update map view & marker styles on selection change
  useEffect(() => {
    if (!mapRef.current || !selectedCode) return;

    const activeCountry = countries.find((c) => c.code === selectedCode);
    if (activeCountry) {
      mapRef.current.flyTo([activeCountry.lat, activeCountry.lng], 4, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }

    countries.forEach((c) => {
      const marker = markersRef.current[c.code];
      const data = weatherData[c.code] || fallbackWeatherData[c.code];
      if (marker) {
        const isSelected = c.code === selectedCode;
        marker.setStyle({
          radius: isSelected ? 16 : 12,
          color: isSelected ? "#ffffff" : "#00140c",
          weight: isSelected ? 3.5 : 2,
          fillColor: getTempColor(data?.current?.temp),
          fillOpacity: 0.92
        });
        if (isSelected) {
          marker.openPopup();
        }
      }
    });
  }, [selectedCode, weatherData]);

  const selected = weatherData[selectedCode] || fallbackWeatherData[selectedCode];

  return (
    <div className="brics-weather-dashboard">
      {/* MAP */}
      <div className="weather-map-container">
        <div ref={mapContainerRef} className="brics-weather-map" />

        <div className="weather-map-legend">
          <span className="legend-title">Live Temp (°C)</span>
          <div className="legend-scale">
            <span style={{ background: "#3b82f6" }} title="≤ 0°C"></span>
            <span style={{ background: "#38bdf8" }} title="0 - 15°C"></span>
            <span style={{ background: "#22c55e" }} title="16 - 25°C"></span>
            <span style={{ background: "#eab308" }} title="26 - 32°C"></span>
            <span style={{ background: "#f97316" }} title="33 - 38°C"></span>
            <span style={{ background: "#ef4444" }} title="38°C+"></span>
          </div>
          <div className="legend-range">
            <span>Cold (≤0°)</span>
            <span>Hot (38°+)</span>
          </div>
        </div>
      </div>

      {/* SELECTED COUNTRY PANEL */}
      <div className="weather-country-panel">
        <span className="panel-label">LIVE CLIMATE TELEMETRY</span>

        <div className="weather-panel-header-row">
          <h2>{selected?.name}</h2>
          <span className="weather-country-code-pill">{selected?.code}</span>
        </div>

        {selected?.current && (
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
                <span>Relative Humidity</span>
                <strong>{Math.round(selected.current.humidity)}%</strong>
              </div>
              <div className="weather-meta-card">
                <span>Wind Velocity</span>
                <strong>
                  {Math.round(selected.current.windSpeed)} km/h
                </strong>
              </div>
              <div className="weather-meta-card">
                <span>Monitoring Capital</span>
                <strong>{selected.city}</strong>
              </div>
              <div className="weather-meta-card">
                <span>Telemetry Status</span>
                <strong className="text-green">
                  {loading ? "Updating…" : "Live Feeds"}
                </strong>
              </div>
            </div>

            {selected.daily && (
              <div className="weather-forecast-strip">
                <span className="forecast-title">5-Day Climate Outlook</span>
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
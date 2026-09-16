# Weatherly

A clean, modern, and minimalist weather web application built with HTML, CSS, and JavaScript. Weatherly fetches live weather data from the [OpenWeatherMap API](https://openweathermap.org/api), where you could put your API Key, City and Country to check the weather.

---

## Features

- **User-supplied API key** — Enter your own OpenWeatherMap API key directly in the browser (nothing is hard-coded).
- **Location search** — Enter a city and a two-letter country code (e.g., `London`, `GB`).
- **Live weather data** — Real-time temperature, condition, humidity, wind speed, pressure, visibility, and cloud cover.
- **Clean UI** — Minimalist card-based design with a gradient background, responsive layout, and smooth interactions.
- **Error handling** — Informative messages for invalid API keys, missing/unknown locations, and network failures.
- **Responsive design** — Works on desktop, tablet, and mobile screens.

---

## Project Structure

```
weather-app/
├── index.html      # Application markup
├── style.css       # All styles (clean, modern, responsive)
├── script.js       # JavaScript logic and API integration
└── README.md       # This file
```

---

## How to Run

1. **Get an OpenWeatherMap API key:**
   - Go to [openweathermap.org](https://home.openweathermap.org/users/sign_up) and create a free account.
   - Navigate to the [API keys tab](https://home.openweathermap.org/api_keys) and create a new key.

2. **Open the application:**
   - Double-click `index.html` or open it in your browser (Chrome, Firefox, Edge, etc.).

3. **Use the app:**
   - Enter your **API Key**.
   - Enter a **City** (e.g., `London`).
   - Enter a **Country** code (e.g., `GB`).
   - Click **Get Weather**.
   - View the current weather details.

> **Note:** The free tier of OpenWeatherMap may take a few minutes to activate a new API key.

---

## Getting an API Key

1. Sign up for a free account at [https://home.openweathermap.org/users/sign_up](https://home.openweathermap.org/users/sign_up).
2. Go to the [API keys](https://home.openweathermap.org/api_keys) page.
3. Click **Create key**, give it a name, and copy the generated key.
4. Paste it into the **API Key** field in Weatherly.

---

## API Reference

Weatherly uses the OpenWeatherMap Current Weather Data API endpoint:

```
https://api.openweathermap.org/data/2.5/weather?q={city},{country}&units=metric&appid={API_KEY}
```

The app displays the following data from the API response:

| Field | Description |
|-------|-------------|
| `name` + `sys.country` | Location |
| `main.temp` | Current temperature (°C) |
| `main.feels_like` | Feels-like temperature (°C) |
| `weather[0].description` | Weather condition |
| `weather[0].icon` | Weather icon |
| `main.humidity` | Humidity (%) |
| `main.pressure` | Pressure (hPa) |
| `wind.speed` | Wind speed (converted to km/h) |
| `visibility` | Visibility (converted to km) |
| `clouds.all` | Cloud cover (%) |

---

## Error Handling

| Scenario | Message Displayed |
|----------|-------------------|
| Empty fields | *Please enter your API key, city, and country.* |
| Invalid API key (401) | *Invalid API key. Please check your OpenWeatherMap API key.* |
| Location not found (404) | *Location not found. Please verify the city and country code.* |
| Other API errors | *Request failed with status XXX.* |

---

## Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Flexbox, Grid, responsive design, CSS gradients
- **JavaScript (ES6+)** — `fetch` API, async/await for API calls
- **Font Awesome 6** — Icons for UI elements and weather conditions
- **OpenWeatherMap API** — Live weather data source

---

## License

This project is for educational purposes.

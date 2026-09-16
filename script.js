// ==== DOM Elements ====
const weatherForm = document.getElementById('weather-form');
const getWeatherBtn = document.getElementById('get-weather-btn');
const errorMessageEl = document.getElementById('error-message');
const weatherResultEl = document.getElementById('weather-result');

// ==== Event Listeners ====
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = document.getElementById('api-key').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();

    if (!apiKey || !city || !country) {
        showError('Please enter your API key, city, and country.');
        return;
    }

    hideResults();
    setLoading(true);

    try {
        const data = await fetchWeather(apiKey, city, country);
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
    }
});

// ==== API Call ====
async function fetchWeather(apiKey, city, country) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&units=metric&appid=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        }
        if (response.status === 404) {
            throw new Error(`Location not found. Please verify the city and country code.`);
        }
        if (response.status === 400) {
            throw new Error(errorData.message || 'Bad request. Please check your inputs.');
        }
        throw new Error(errorData.message || `Request failed with status ${response.status}.`);
    }

    return await response.json();
}

// ==== Display Weather ====
function displayWeather(data) {
    const { name, sys, main, weather, wind, visibility, clouds } = data;

    const location = `${name}, ${sys.country}`;
    const temperature = Math.round(main.temp);
    const condition = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const feelsLike = Math.round(main.feels_like);
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed = Math.round(wind.speed * 3.6); // m/s -> km/h
    const visibilityKm = (visibility / 1000).toFixed(1);
    const cloudCover = clouds.all;

    weatherResultEl.innerHTML = `
        <div class="location">
            <h2>${location}</h2>
            <p>${condition}</p>
        </div>

        <div class="weather-main">
            <div class="weather-icon">
                <img src="${iconUrl}" alt="${condition}" />
                <div class="weather-desc">${condition}</div>
            </div>
            <div class="temperature">
                <div class="temp-value">${temperature}°C</div>
                <div class="temp-label">Feels like ${feelsLike}°C</div>
            </div>
        </div>

        <div class="weather-details">
            <div class="detail-item">
                <i class="fas fa-tint"></i>
                <div>
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-wind"></i>
                <div>
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${windSpeed} km/h</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-weight-hanging"></i>
                <div>
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${pressure} hPa</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-eye"></i>
                <div>
                    <div class="detail-label">Visibility</div>
                    <div class="detail-value">${visibilityKm} km</div>
                </div>
            </div>
            <div class="detail-item">
                <i class="fas fa-cloud"></i>
                <div>
                    <div class="detail-label">Cloud Cover</div>
                    <div class="detail-value">${cloudCover}%</div>
                </div>
            </div>
        </div>
    `;

    weatherResultEl.style.display = 'block';
}

// ==== Error / Loading Helpers ====
function showError(message) {
    errorMessageEl.innerHTML = `<i class="fas fa-circle-exclamation"></i> ${message}`;
    errorMessageEl.style.display = 'block';
}

function hideResults() {
    errorMessageEl.style.display = 'none';
    weatherResultEl.style.display = 'none';
}

function setLoading(isLoading) {
    if (isLoading) {
        getWeatherBtn.disabled = true;
        getWeatherBtn.innerHTML = '<span class="spinner"></span> Loading...';
    } else {
        getWeatherBtn.disabled = false;
        getWeatherBtn.innerHTML = '<i class="fas fa-search"></i> Get Weather';
    }
}

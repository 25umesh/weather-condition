const apiKey = "7e8eb46623a4519a977c39e83021bde2"; // Replace with your OpenWeatherMap API key

async function getWeather() {
    let city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("weatherInfo").innerHTML = `<p>⚠️ Please enter a valid location.</p>`;
        return;
    }

    // Add country code for better accuracy if searching for India
    if (city.toLowerCase() === "india") {
        city = "New Delhi"; // Default to capital city if "India" is entered
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 401) {
            document.getElementById("weatherInfo").innerHTML = `<p>🚨 Invalid API Key! Check your API key.</p>`;
            return;
        }

        if (data.cod === "404") {
            document.getElementById("weatherInfo").innerHTML = `<p>❌ City not found! Try another location.</p>`;
            return;
        }

        document.getElementById("weatherInfo").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>🌡 Temperature: ${data.main.temp}°C</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            <p>🌧 Condition: ${data.weather[0].description}</p>
        `;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherInfo").innerHTML = `<p>⚠️ Error fetching weather data. Try again later.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", function () { 
    const inputField = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchBtn");

    function fetchWeather() {
        getWeather(); 
    }

    searchButton.addEventListener("click", fetchWeather);

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            fetchWeather();
        }
    });
});

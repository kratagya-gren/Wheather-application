
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    getWeather();

});


async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city");
        return;
    }


    try {

        // Find city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();


        if (!locationData.results) {
            alert("City not found");
            return;
        }


        const latitude = locationData.results[0].latitude;
        const longitude = locationData.results[0].longitude;
        const cityName = locationData.results[0].name;


        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();


        // Display weather
        document.getElementById("city").textContent = cityName;

        document.getElementById("temperature").textContent =
            `Temperature: ${weatherData.current.temperature_2m}°C`;

        document.getElementById("humidity").textContent =
            `Humidity: ${weatherData.current.relative_humidity_2m}%`;

        document.getElementById("wind").textContent =
            `Wind Speed: ${weatherData.current.wind_speed_10m} km/h`;


    } catch (error) {

        console.error(error);

        alert("Something went wrong. Please try again.");

    }

}
class WeatherNow {
    constructor(city) {
        this.city = city;
    }

    getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${this.city}&appid=bf35cac91880cb98375230fb443a116f`).then(response => response.json()).then(json => { this.renderWeather(json) })
    }
    renderWeather(weather) {
        console.log(weather);
        document.querySelector("#current-date").innerText = new Date(weather.dt * 1000).toLocaleDateString();
        document.querySelector("#current-time").innerText = new Date(weather.dt * 1000).toLocaleTimeString();
        document.querySelector("#current-temperature").innerText = parseInt(weather.main.temp);
        document.querySelector("#current-clouds").src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        document.querySelector("#current-weather-description").innerText = weather.weather[0].description;
        document.querySelector("#current-feels-like").innerText = `Feels like ${parseInt(weather.main.feels_like)}`;
        document.querySelector("#current-pressure").innerText = weather.main.pressure;
        document.querySelector("#current-wind").innerText = `${parseInt(weather.wind.speed)} km/h`;
        document.querySelector("#current-humidity").innerText = `${weather.main.humidity}%`;

    }
}

if(localStorage.currentCity != undefined){
    new WeatherNow(localStorage.currentCity).getWeather();
    switch (localStorage.currentCity) {
        case "702550":
            document.querySelector('input[value="Lviv"]').checked = true;
            break;
        case "703448":
            document.querySelector('input[value="Kyiv"]').checked = true;
            break;
        case "5128638":
            document.querySelector('input[value="New-York"]').checked = true;
            break;
        case "2643743":
            document.querySelector('input[value="London"]').checked = true;
            break;
    }
}
else{
    new WeatherNow("703448").getWeather();
    localStorage.currentCity = "703448";
    document.querySelector('input[value="Kyiv"]').checked = true;
}

document.querySelector("ul").addEventListener("click", changeCity);

function changeCity(e) {
    if (e.target.value != undefined) {
        switch (e.target.value) {
            case "Lviv":
                new WeatherNow("702550").getWeather();
                localStorage.currentCity = "702550";
                break;
            case "Kyiv":
                new WeatherNow("703448").getWeather();
                localStorage.currentCity = "703448";
                break;
            case "New-York":
                new WeatherNow("5128638").getWeather();
                localStorage.currentCity = "5128638";
                break;
            case "London":
                new WeatherNow("2643743").getWeather();
                localStorage.currentCity = "2643743";
                break;
        }
    }
}

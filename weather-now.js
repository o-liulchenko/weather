class WeatherNow {
    constructor(city, units) {
        this.city = city;
        this.units = units;
        this.apiId = "93230c716f5247172fd4ab32361dcfe7";
        // this.apiId = "bf35cac91880cb98375230fb443a116f";
    }
    get getWeather() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?id=${this.city}&appid=${this.apiId}${this.units}&lang=uk`).then(response => response.json())
    }
    renderWeather() {
        this.getWeather.then(weather => {
            console.log(this);
            document.querySelector("#current-date").innerText = new Date(weather.dt * 1000).toLocaleDateString();
            document.querySelector("#current-temperature").innerText = parseInt(weather.main.temp);
            document.querySelector("#current-clouds").src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            document.querySelector("#current-weather-description").innerText = weather.weather[0].description;
            document.querySelector("#current-feels-like").innerText = `Відчувається як ${parseInt(weather.main.feels_like)} ${localStorage.currentUnitsValue}`;
            document.querySelector("#current-pressure").innerText = `${weather.main.pressure} мм.рт.ст`;
            document.querySelector("#current-wind").innerText = `${parseInt(weather.wind.speed)} км/г`;
            document.querySelector("#current-humidity").innerText = `${weather.main.humidity}%`;
        })
    }
}

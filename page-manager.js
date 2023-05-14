
if (localStorage.currentCity != undefined && localStorage.currentUnitsUrl != undefined) {
    new WeatherNow(localStorage.currentCity, localStorage.currentUnitsUrl).renderWeather();
    switch (localStorage.currentCity) {
        case "702550":
            document.querySelector('#city-lviv').classList.add("active");
            break;
        case "703448":
            document.querySelector('#city-kyiv').classList.add("active");
            break;
        case "5128638":
            document.querySelector('#city-new-york').classList.add("active");
            break;
        case "2643743":
            document.querySelector('#city-london').classList.add("active");
            break;
    }
    document.querySelector(".city-info").prepend(document.querySelector(".city-info .active"));

    switch (localStorage.currentUnitsUrl) {
        case "&units=metric":
            document.querySelector("#celsius").classList.add("active");
            break;
        case "":
            document.querySelector("#kelvin").classList.add("active");
            break;
        case "&units=imperial":
            document.querySelector("#fahrenheit").classList.add("active");
            break;
    }
    document.querySelector(".units").prepend(document.querySelector(".units .active"));
}
else {
    new WeatherNow("703448", "&units=metric").renderWeather();
    localStorage.currentCity = "703448";
    localStorage.currentUnitsUrl = "&units=metric";
    localStorage.currentUnitsValue = "C°";
    document.querySelector('#city-kyiv').classList.add("active");
    document.querySelector('#celsius').classList.add("active");
}

// document.querySelector("title").innerText = `${document.querySelector(".city-info .active").innerText} - прогноз погоди`;

let visible = false;

class PageManager {
    constructor() {
        this.visible = false;
    }
    burgerMenu(event) {
        if (event.target.nodeName == "SPAN") {
            let burgerElements = event.target.parentElement.querySelectorAll("span");
            event.target.parentElement.prepend(event.target);
            console.log();
            visible = !visible;
            if (visible) {
                for (const burgElem of burgerElements) {
                    burgElem.style.display = "none";
                }
            }
            else {
                for (const burgElem of burgerElements) {
                    burgElem.style.display = "inline-block";
                }
            }
            if (!event.target.classList.contains("active")) {
                event.target.parentElement.querySelector(".active").classList.remove("active");
                event.target.classList.add("active");
            }
        }
    }
    changeCity(event) {
        if (!event.target.classList.contains("active") && event.target.nodeName == "SPAN") {
            console.log(event);
            switch (event.target.id) {
                case "city-lviv":
                    localStorage.currentCity = "702550";
                    break;
                // case "city-kyiv":
                //     localStorage.currentCity = "703448";
                //     break;
                case "city-new-york":
                    localStorage.currentCity = "5128638";
                    break;
                case "city-london":
                    localStorage.currentCity = "2643743";
                    break;
                default:
                    localStorage.currentCity = "703448";
                    break;
            }
            new WeatherNow(localStorage.currentCity, localStorage.currentUnitsUrl).renderWeather(); // ПОТРЕБУЄ РЕДАГУВАННЯ
        }
    }
    changeUnits(event){
        if (!event.target.classList.contains("active") && event.target.nodeName == "SPAN") {
            console.log(event);
            switch (event.target.id) {
                case "fahrenheit":
                    localStorage.currentUnitsUrl = "&units=imperial";
                    localStorage.currentUnitsValue = "F";
                    break;
                // case "celsius":
                //     localStorage.currentUnitsUrl = "&units=metric";
                //     localStorage.changeUnitsValue = "C";
                //     break;
                case "kelvin":
                    localStorage.currentUnitsUrl = "";
                    localStorage.currentUnitsValue = "K";
                    break;
                default:
                    localStorage.currentUnitsUrl = "&units=metric";
                    localStorage.currentUnitsValue = "C°";
                    break;
            }
            new WeatherNow(localStorage.currentCity, localStorage.currentUnitsUrl).renderWeather(); // ПОТРЕБУЄ РЕДАГУВАННЯ
        }
    }
}


document.querySelector(".city-info").addEventListener("click", new PageManager().changeCity);
document.querySelector(".units").addEventListener("click", new PageManager().changeUnits);

for (const burger of document.querySelectorAll(".burger")) {
    burger.addEventListener("click", new PageManager().burgerMenu);
}

const apiKey = "585884ddec6ed3c2601cfb2e14610422"
const searchInput = document.getElementById("search")
const displayWeather = document.getElementById("main-content")

let longitude
let latitude

searchInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        displayWeather.innerHTML = ""
        getLocalization()
    }
})

function getLocalization(){
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + searchInput.value +"&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => getWeather(data))
}

function getWeather(data){
    longitude = data[0].lon
    latitude = data[0].lat

    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+apiKey+"&units=metric")
    .then((response) => response.json())
    .then((data) => showData(data))
}

function showData(data){
    console.log(data)
    let tempMin = data.main.temp_min 
    let tempMax = data.main.temp_max
    let currentTemp = data.main.temp
    let feelTemp = data.main.feels_like
    let cityName = data.name
    let country = data.sys.country
    let description = data.weather[0].main
    let icon = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"

    let displayInfo = `
    <div id="today">
        <h2 id="localization">${cityName}, ${country}</h2>
        <div id="img"><img src="${icon}" alt="temperature-icon"></div>
        <p id="temp-description"><span>${description}</span></p>
        <p id="temperature"><span>${currentTemp}&deg;C</span></p>
        <p id="temp-min-max">Min: <span>${tempMin}&deg;C</span> Max: <span>${tempMax}&deg;C</span></p>
        <p id="temp-fell">Feels Like: <span>${feelTemp}&deg;C</span></p>
    </div>
    `

    displayWeather.innerHTML = displayInfo
}
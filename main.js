
let currentcity = 'Philippines';
let units = 'metric';

document.querySelector('.search_weather').addEventListener('submit', e=>{
    let search = document.querySelector(".search_form");
    e.preventDefault();
    currentcity =search.value;
    getWeather();
})

document.querySelector(".weather_celcius").addEventListener('click', ()=>{
    if(units!=="metric"){
        units ="metric"
        getWeather()
    }
})


document.querySelector(".weather_fareheit").addEventListener('click', ()=>{
    if(units!=="imperial"){
        units ="imperial"
        getWeather()
    }
})

let city = document.querySelector('.weather_city');
let datetime = document.querySelector('.weather_datetime');
let weather_forecast =document.querySelector('.weather_forecast');
let weather_temperature = document.querySelector(".weather_temperature");

//icon 
let weather_icon = document.querySelector(".weather_icon");
//min and maximum
let weather_minmax = document.querySelector(".weather_minmax");

//weather information
let weather_realfeel = document.querySelector(".weather_realfeel");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");



function convertTimeStamp(timestamp,timezone){
    const convertTimezone = timezone/3600;
    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        timeZone:`Etc/GMT${convertTimezone>=0?"-":"+"}${Math.abs(convertTimezone)}`,
        hour12:true,
    }

    return date.toLocaleString("en-US", options)

}

function convertCountryCode (country){
let regionNames = new Intl.DisplayNames(["en"],{type:"region"});
return regionNames.of(country)
}
function getWeather(){

    const API_KEY = '0dd41efcf6e173fd65d10515eacb95d2'

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${currentcity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data =>
{
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp (data.dt,data.timezone);
    weather_forecast.innerHTML = `<p>${data.weather[0].main}`
    weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
    weather_minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176</p><p>Max:${data.main.temp_max.toFixed()}&#176</p>`
    weather_realfeel.innerHTML =`${data.main.feels_like.toFixed()}&#176`
    weather_humidity.innerHTML =`${data.main.humidity.toFixed()}%`
    weather_wind.innerHTML =`${data.wind.speed}${units === "imperial"?"mph":"m/s"}`
    weather_pressure.innerHTML =`${data.main.pressure}hPa`
})
}   

document.body.addEventListener("load",getWeather())


const apiKey = '768c5ef69582df8d714238461d2c0948'; 
const defaultCity = 'Delhi,IN';

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(defaultCity);
});

function fetchWeather(city = defaultCity) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function updateWeather(data) {
    const currentDate = new Date();
    document.getElementById('currentDate').innerText = currentDate.toDateString();
    document.getElementById('currentCondition').innerText = data.weather[0].description;
    document.getElementById('currentTemperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('feelsLike').innerText = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s, ${data.wind.deg}°`;
    document.getElementById('currentLocation').innerText = `${data.name}, ${data.sys.country}`;

    setWeatherBackground(data.weather[0].main);
}

function setWeatherBackground(condition) {
    const weatherContainer = document.getElementById('currentWeather');
    let backgroundUrl = '';

    switch (condition.toLowerCase()) {
        case 'clear':
            backgroundUrl = 'url("https://media.istockphoto.com/id/1325299873/photo/blue-sky-over-the-sea.jpg?s=2048x2048&w=is&k=20&c=cBuLpcQDjWcKiEfrlcid6mbf4hpplRVXPRQ94vR3Fzk=")';
            break;
        case 'clouds':
            backgroundUrl = 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg")';
            break;
        case 'rain':
            backgroundUrl = 'url("https://media.istockphoto.com/id/517643357/photo/thunderstorm-lightning-with-dark-cloudy-sky.jpg?s=612x612&w=0&k=20&c=x3G3UijRPVGFMFExnlYGbnQtnlH6-oUoMU48BTkc0Os=")';
            break;
        case 'snow':
            backgroundUrl = 'url("https://t3.ftcdn.net/jpg/02/98/03/22/360_F_298032209_YD4pFLDyzMyqBzso5xF5USR05hxqGuXf.jpg")';
            break;
        
        default:
            backgroundUrl = 'url("https://img.freepik.com/premium-photo/blue-sky-background-with-tiny-clouds_127755-1384.jpg")';
    }

    weatherContainer.style.backgroundImage = backgroundUrl;
}

document.querySelector('button').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
});

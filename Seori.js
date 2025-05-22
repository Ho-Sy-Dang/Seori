const apiKey = "cddae1f52f5beef9c20fa6bb6258fcab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    const condition = data.weather[0].main;

    if (condition === "Clouds") {
      weatherIcon.src = "https://i.postimg.cc/W1KyTM5M/clouds.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "https://i.postimg.cc/6QRxS9dL/clear.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "https://i.postimg.cc/ZnFndXXc/rain.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "https://i.postimg.cc/zv5mgzLP/drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "https://i.postimg.cc/Qx2QkFNt/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

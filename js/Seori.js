const apiKey = "cddae1f52f5beef9c20fa6bb6258fcab"; // Khóa API OpenWeatherMap
// Sử dụng &units=metric để nhận nhiệt độ Celsius
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const errorDisplay = document.querySelector(".error");

// Hàm để lấy URL icon dựa trên mã icon từ OpenWeatherMap
function getIconUrl(iconCode) {
    // OpenWeatherMap cung cấp icon theo mã, ví dụ "01d", "04n"
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Gọi API thời tiết
async function checkWeather(city) {
  console.log("Đang tìm kiếm thời tiết cho:", city);
  try {
    const response = await fetch(apiUrl + city);

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Không tìm thấy thành phố. Vui lòng kiểm tra lại tên.";
      if (errorData && errorData.message) {
        errorMessage = "Lỗi API: " + errorData.message;
      }
      errorDisplay.style.display = "block";
      errorDisplay.querySelector('p').textContent = errorMessage;
      document.querySelector(".weather").style.display = "none";
      console.error("Lỗi phản hồi API:", response.status, errorData);
      return;
    }

    const data = await response.json();
    console.log("Dữ liệu API nhận được:", data); // Ghi log toàn bộ dữ liệu

    // Cập nhật thông tin thời tiết trên giao diện
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";

    // Cập nhật icon thời tiết
    if (data.weather && data.weather.length > 0) {
      const weatherMain = data.weather[0].main;
      const weatherIconCode = data.weather[0].icon; // Lấy mã icon từ API
      console.log("Loại thời tiết chính (main):", weatherMain);
      console.log("Mã icon thời tiết:", weatherIconCode);

      // Sử dụng mã icon trực tiếp từ API để đảm bảo khớp
      weatherIcon.src = getIconUrl(weatherIconCode);
    } else {
      weatherIcon.src = "https://i.postimg.cc/k4G6V2B5/clouds.png"; // Icon mặc định nếu không có dữ liệu weather
      console.warn("Không có thông tin thời tiết chính trong dữ liệu. Sử dụng icon mặc định.");
    }

    document.querySelector(".weather").style.display = "block";
    errorDisplay.style.display = "none";
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu thời tiết:", error);
    errorDisplay.style.display = "block";
    errorDisplay.querySelector('p').textContent = "Không thể kết nối đến máy chủ thời tiết hoặc dữ liệu không hợp lệ.";
    document.querySelector(".weather").style.display = "none";
  }
}

// Xử lý sự kiện tìm kiếm thời tiết
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkWeather(city);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
  }
});
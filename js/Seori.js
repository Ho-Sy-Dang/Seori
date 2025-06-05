const apiKey = "5a26c2988bf8c3f097ca22781da1f921";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Gọi API thời tiết từ WeatherAPI.com
async function checkWeather(city) {
  try {
    // Không thêm ", Vietnam" mặc định nữa.
    // API sẽ tự cố gắng tìm kiếm toàn cầu dựa trên tên thành phố.
    const response = await fetch(apiUrl + city);

    if (!response.ok) {
      // Nếu API trả về lỗi (ví dụ: không tìm thấy thành phố)
      // Kiểm tra mã trạng thái để đưa ra thông báo cụ thể hơn nếu có thể
      const errorData = await response.json();
      if (errorData && errorData.error && errorData.error.message) {
        throw new Error(errorData.error.message); // Hiển thị thông báo lỗi từ API
      } else {
        throw new Error("Không tìm thấy thành phố. Vui lòng kiểm tra lại tên.");
      }
    }

    const data = await response.json();
    console.log(data);
    // Vẫn truyền 'city' (tên người dùng nhập) và dữ liệu API để hiển thị.
    renderWeather(data);
  } catch (error) {
    console.log(error.message);
    showError(error.message);
  }
}

// Cập nhật giao diện khi có dữ liệu
function renderWeather(data) {
  // Hiển thị tên thành phố mà người dùng đã nhập, và quốc gia mà API đã tìm thấy.
  // Điều này sẽ giúp phân biệt nếu có nhiều thành phố trùng tên ở các quốc gia khác nhau.
  document.querySelector(".city").innerHTML =
    data.name + ", <br/>" + data.weather[0].description;
  document.querySelector(".temp").innerText =
    Math.round(data.main.temp) + "°F";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + " km/h";

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.name;

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// Hiển thị lỗi
function showError(message) {
  document.querySelector(".error").innerText = "⚠️ " + message;
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

// Tìm kiếm khi click hoặc Enter
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

// Xử lý đăng nhập giả lập (localStorage)
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("fade-in");

  const authLinks = document.getElementById("auth-links");
  const accountButtonContainer = document.getElementById(
    "account-button-container"
  );
  const accountButton = document.getElementById("account-button");
  const profilePicture = document.getElementById("profile-picture");

  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const savedProfilePicture = localStorage.getItem("profilePicture");

    if (isLoggedIn) {
      authLinks.style.display = "none";
      accountButtonContainer.style.display = "block";
      profilePicture.src =
        savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";
      profilePicture.style.filter = savedProfilePicture
        ? "none"
        : "grayscale(100%)";
    } else {
      authLinks.style.display = "block";
      accountButtonContainer.style.display = "none";
    }
  }

  accountButton.addEventListener("click", () => {
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "Account.html";
    }, 500);
  });

  checkLoginStatus();
});

const currentEmail = localStorage.getItem("currentUser"); // lay email nguoi da dang nhap
const currentUserInfo = localStorage.getItem(currentEmail); // tim kiem thong tin tren local storage
const currentUserInfoObj = JSON.parse(currentUserInfo); // chuyen JSON -> obj

const updateBtn = document.getElementById("update-btn");
const logoutBtn = document.getElementById("logout-btn");

// --------------------------------
// thay doi trang thai cua thanh nav (an/ hien nut login/account)
function checkLogedIn() {
  const currentUser = localStorage.getItem("currentUser");
  const loginButton = document.getElementById("login-link");
  const accountButton = document.getElementById("account-link");
  if (currentUser) {
    loginButton.style.display = "none";
    accountButton.style.display = "block";
  } else {
    loginButton.style.display = "block";
    accountButton.style.display = "none";
  }
}

// --------------------------------
// hien thi thong tin tai khoan
function showAccountInfo() {
  const username = document.getElementById("username");
  username.value = currentUserInfoObj.username;

  const email = document.getElementById("email");
  email.value = currentEmail;

  const phone = document.getElementById("phone");
  phone.value = currentUserInfoObj.phoneNum;

  const new_password = document.getElementById("new-password");
  new_password.value = currentUserInfoObj.password;
}

// --------------------------------
// dang xuat tai khoan
logoutBtn?.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html"; // Chuyen huong ve trang chu
});

// --------------------------------
// kiem tra du lieu nhap vao
function validateUpdateAccountForm(username, password, phoneNum) {
  // kiem tra username (>= 6 ky tu)
  if (username.length < 6) {
    alert("Username must be at least 6 characters long.");
    return false;
  }
  // password (>= 6 ky tu)
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  if (phoneNum.length < 10) {
    alert("Phone number must be at least 10 digits long.");
    return false;
  }
  return true;
}

// --------------------------------
// thay doi thong tin tai khoan
updateBtn?.addEventListener("click", function (event) {
  console.log(123);
  event.preventDefault();

  const newUsername = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const newPhone = document.getElementById("phone").value;
  const newPassword = document.getElementById("new-password").value;

  if (validateUpdateAccountForm(newUsername, newPassword, newPhone)) {
    const newUserInfo = {
      username: newUsername,
      phoneNum: newPhone,
      password: newPassword,
    };
    // luu moi vao local storage
    localStorage.setItem(email, JSON.stringify(newUserInfo));
    // thong bao thanh cong
    alert("Updated successfully!");
  }
});

// --------------------------------
// hien thi thong tin thoi tiet dua tren vi tri cua nguoi dung
function getIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

async function fetchWeather(latitude, longitude) {
  const apiKey = "cddae1f52f5beef9c20fa6bb6258fcab";
  const weatherIconElement = document.getElementById("icon");
  const temperatureElement = document.getElementById("temp");
  const cityNameElement = document.getElementById("city-name");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Weather API error: ${response.status} - ${
          errorData.message || "Unknown error"
        }`
      );
    }
    const data = await response.json();
    console.log("Weather data:", data);

    // Update DOM with weather data
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    cityNameElement.textContent = data.name;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;

    // Update weather icon based on API response
    if (data.weather && data.weather.length > 0) {
      const iconCode = data.weather[0].icon;
      weatherIconElement.src = getIconUrl(iconCode);
    } else {
      // Fallback to a default icon if weather data is missing
      weatherIconElement.src = "https://i.postimg.cc/k4G6V2B5/clouds.png"; // Example default icon
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    // Hide icon and display error message
    temperatureElement.textContent = "--°C";
    cityNameElement.textContent = "N/A";
    humidityElement.textContent = "--%";
    windSpeedElement.textContent = "-- km/h";
  }
}

function showWeather() {
  // Get references to the weather display elements
  const temperatureElement = document.getElementById("temp");
  const cityNameElement = document.getElementById("city-name");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(lat, lon);
      },
      (error) => {
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to retrieve your location.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage =
            "Location access denied. Please enable location services for accurate weather.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "The request to get user location timed out.";
        }

        // Reset weather display and show error
        temperatureElement.textContent = "--°C";
        cityNameElement.textContent = "N/A";
        humidityElement.textContent = "--%";
        windSpeedElement.textContent = "-- km/h";
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Geolocation options
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Display error if geolocation is not supported
    temperatureElement.textContent = "--°C";
    cityNameElement.textContent = "N/A";
    humidityElement.textContent = "--%";
    windSpeedElement.textContent = "-- km/h";
  }
}

// --------------------------------
// chuyen ve trang chu (tu account)
document.getElementById("back-button")?.addEventListener("click", () => {
  window.location.href = "../index.html"; // Chuyen huong ve trang chu
});

// --------------------------------
// bat su kien khi load trang
document.addEventListener("DOMContentLoaded", () => {
  // kiem tra duong dan web -> neu k co tu khoa pages thi xac dinh la trang index
  const page = window.location.href.includes("/pages/") ? "others" : "index";
  if (page === "index") {
    checkLogedIn(); // Kiem tra trang thai dang nhap
  } else {
    showAccountInfo();
    showWeather();
  }
});

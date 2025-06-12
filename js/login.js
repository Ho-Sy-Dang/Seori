const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// -----------------------------------------------------
// kiem tra form dang ki
function validateSignupForm(email, username, password, phoneNum) {
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

// -----------------------------------------------------
// kiem tra trung lap
function isEmailRegistered(email) {
  // kiem tra xem email da ton tai trong local storage chua
  if (localStorage.getItem(email) !== null) {
    return true;
  }
  return false;
}

// -----------------------------------------------------
// dang ki -> luu local storage
function signupToLocalStorage() {
  // lay du lieu tu form
  const email = document.getElementById("signup_email").value;
  const username = document.getElementById("signup_username").value;
  const password = document.getElementById("signup_password").value;
  const phoneNum = document.getElementById("signup_phoneNum").value;

  // kiem tra form
  if (isEmailRegistered(email)) {
    alert("Email is already registered. Please use a different email.");
    return;
  }
  const checked = validateSignupForm(email, username, password, phoneNum);
  if (checked == true) {
    // luu vao local storage
    const newUser = {
      username: username,
      password: password,
      phoneNum: phoneNum,
    };
    localStorage.setItem(email, JSON.stringify(newUser));
    // luu current user
    localStorage.setItem("currentUser", email);
    // thong bao
    alert("Registration successful!");
    // chuyen trang home
    window.location.href = "../index.html";
  }
}

// -----------------------------------------------------
// dang nhap -> chuyen home
function loginToHome() {
  // lay du lieu tu form
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;
  // kiem tra email da dang ki chua
  if (isEmailRegistered(email)) {
    // kiem tra password
    const userInfo = JSON.parse(localStorage.getItem(email));
    // so sanh password
    if (userInfo.password === password) {
      // dang nhap thanh cong
      // luu current user vao local storage
      localStorage.setItem("currentUser", email);
      alert("Login successful! Redirecting to home page...");
      // chuyen trang
      window.location.href = "../index.html"; // chuyen den trang home
    } else {
      // mat khau khong dung
      alert("Incorrect password. Please try again.");
      return;
    }
  } else {
    // email chua dang ki
    alert("Email not registered. Please sign up first.");
    return;
  }
}

// -----------------------------------------------------
// bat su kien cho nut dang ki
signupForm.addEventListener("submit", function (event) {
  event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
  signupToLocalStorage(); // goi ham dang ki
});

// -----------------------------------------------------
// bat su kien cho nut dang nhap
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
  loginToHome(); // goi ham dang nhap
});

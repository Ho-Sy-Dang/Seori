document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();
  // Trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu đăng ký đến máy chủ
  // Sau khi đăng ký thành công, bạn sẽ đặt trạng thái đăng nhập
  localStorage.setItem("isLoggedIn", "true");
  // Có thể lưu thông tin người dùng khác nếu cần
  window.location.href = "index.html"; // Chuyển hướng về trang chính
});

document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  // Trong một ứng dụng thực tế, bạn sẽ xác thực thông tin đăng nhập với máy chủ
  // Nếu đăng nhập thành công, bạn sẽ đặt trạng thái đăng nhập
  localStorage.setItem("isLoggedIn", "true");
  // Có thể lưu thông tin người dùng khác nếu cần
  window.location.href = "index.html"; // Chuyển hướng về trang chính
});

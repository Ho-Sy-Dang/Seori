// Function to show error messages (Giữ lại hàm nhưng sẽ không gọi đến nó trong logic đăng nhập/đăng ký)
function showErrorMessage(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        errorElement.classList.add('shake');
        setTimeout(() => errorElement.classList.remove('shake'), 500); // Remove shake after animation
    }
}

// Function to hide error messages (Giữ lại hàm nhưng sẽ không gọi đến nó trong logic đăng nhập/đăng ký)
function hideErrorMessage(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.textContent = '';
    }
}

// Bắt sự kiện click vào nút đăng ký ------------------------------
document.getElementById("signup-form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Loại bỏ hoàn toàn các kiểm tra và lưu trữ người dùng
    // Nó sẽ luôn được coi là đăng ký thành công và chuyển hướng

    localStorage.setItem("isLoggedIn", "true");
    // Lưu một thông tin người dùng giả định hoặc lấy từ input (nếu muốn)
    const username = document.querySelector("#signup-form input[name='txt']").value.trim() || "GuestUser";
    const email = document.querySelector("#signup-form input[name='email']").value.trim() || "guest@example.com";
    localStorage.setItem("currentUser", JSON.stringify({ username: username, email: email }));

    alert("Đăng ký thành công (chế độ tự động đăng nhập)!");
    // Từ pages/login.html trở về index.html (thư mục gốc)
    window.location.href = "../index.html";
});

// Bắt sự kiện click vào nút đăng nhập ------------------------------
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Loại bỏ hoàn toàn các kiểm tra email/mật khẩu
    // Nó sẽ luôn được coi là đăng nhập thành công và chuyển hướng

    localStorage.setItem("isLoggedIn", "true");
    // Lưu một thông tin người dùng giả định hoặc lấy từ input (nếu muốn)
    const email = document.querySelector("#login-form input[name='email']").value.trim() || "guest@example.com";
    // Trong trường hợp này, bạn có thể cần một username giả định nếu currentUser yêu cầu nó
    const username = "Logged In User"; // Một tên mặc định

    localStorage.setItem("currentUser", JSON.stringify({ username: username, email: email }));

    alert("Đăng nhập thành công (chế độ tự động đăng nhập)!");
    // Từ pages/login.html trở về index.html (thư mục gốc)
    window.location.href = "../index.html";
});
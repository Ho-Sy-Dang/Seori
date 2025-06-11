document.addEventListener("DOMContentLoaded", () => {
  const currentProfilePicture = document.getElementById(
    "current-profile-picture"
  );
  const profilePictureInput = document.getElementById("profile-picture-input");
  const logoutButton = document.getElementById("logout-button");
  const backButton = document.getElementById("back-button");
  const saveButton = document.getElementById("save-button");

  const unsavedWarning = document.getElementById("unsaved-warning");
  const discardButton = document.getElementById("discard-button");
  const confirmSaveButton = document.getElementById("confirm-save-button");

  let savedProfilePicture = localStorage.getItem("profilePicture");
  let unsavedImage = null;

  currentProfilePicture.src =
    savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";

  profilePictureInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        unsavedImage = e.target.result;
        currentProfilePicture.src = unsavedImage;
        unsavedWarning.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  saveButton.addEventListener("click", () => {
    if (unsavedImage) {
      localStorage.setItem("profilePicture", unsavedImage);
      savedProfilePicture = unsavedImage;
      unsavedImage = null;
      unsavedWarning.classList.add("hidden");
      saveButton.classList.remove("hidden");
      alert("Đã lưu ảnh!");
    }
  });

  // Xử lý nút đăng xuất
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser"); // Xóa thông tin người dùng hiện tại
    localStorage.removeItem("profilePicture");
    document.body.classList.add("fade-out");
    setTimeout(() => {
        // Từ pages/Account.html trở về index.html (thư mục gốc)
        window.location.href = "../index.html"; // ĐÃ SỬA ĐỔI
    }, 500);
  });

  // Xử lý nút quay lại
  backButton.addEventListener("click", () => {
    if (unsavedImage) {
      const confirmDiscard = confirm("Bạn có thay đổi ảnh đại diện chưa lưu. Bạn có muốn bỏ qua các thay đổi này không?");
      if (confirmDiscard) {
        currentProfilePicture.src = savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";
        unsavedImage = null;
        unsavedWarning.classList.add("hidden"); // Ẩn cảnh báo sau khi bỏ qua
        saveButton.classList.remove("hidden"); // Hiển thị lại nút save
      } else {
          return; // Không quay lại nếu người dùng không muốn bỏ qua
      }
    }
    document.body.classList.add("fade-out");
    setTimeout(() => {
      // Từ pages/Account.html trở về index.html (thư mục gốc)
      window.location.href = "../index.html"; // ĐÃ SỬA ĐỔI
    }, 500);
  });

  discardButton.addEventListener("click", () => {
    currentProfilePicture.src =
      savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";
    unsavedImage = null;
    unsavedWarning.classList.add("hidden");
    saveButton.classList.remove("hidden"); // Đảm bảo nút save hiển thị lại
  });

  confirmSaveButton.addEventListener("click", () => {
    if (unsavedImage) {
      localStorage.setItem("profilePicture", unsavedImage);
      savedProfilePicture = unsavedImage;
      unsavedImage = null;
      unsavedWarning.classList.add("hidden");
      saveButton.classList.remove("hidden");
      alert("Đã lưu ảnh!");
    }
  });

    // Thêm logic để hiển thị nút "Save" ban đầu khi không có thay đổi
    // và ẩn nó khi có thay đổi chưa lưu.
    function updateSaveButtonVisibility() {
        if (unsavedImage) {
            saveButton.classList.add("hidden");
        } else {
            saveButton.classList.remove("hidden");
        }
    }

    // Gọi lần đầu khi tải trang
    updateSaveButtonVisibility();
});
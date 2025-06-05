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
      alert("Đã lưu ảnh!");
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("profilePicture");
    window.location.href = "index.html";
  });

  backButton.addEventListener("click", () => {
    if (unsavedImage) {
      currentProfilePicture.src =
        savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";
      unsavedImage = null;
    }

    document.body.classList.add("fade-out"); // thêm hiệu ứng

    setTimeout(() => {
      window.location.href = "index.html";
    }, 500); // đợi hiệu ứng xong mới chuyển
  });

  discardButton.addEventListener("click", () => {
    currentProfilePicture.src =
      savedProfilePicture || "https://i.postimg.cc/pVw7W9Bv/user-icon.png";
    unsavedImage = null;
    unsavedWarning.classList.add("hidden");
  });

  confirmSaveButton.addEventListener("click", () => {
    if (unsavedImage) {
      localStorage.setItem("profilePicture", unsavedImage);
      savedProfilePicture = unsavedImage;
      unsavedImage = null;
      unsavedWarning.classList.add("hidden");

      confirmSaveButton.classList.add("shake");
      setTimeout(() => {
        confirmSaveButton.classList.remove("shake");
      }, 500);
    }
  });
});

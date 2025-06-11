const geminiApiKey = "AIzaSyBkS2oxzQAde6hFKRwNvTfOLJGvNXd6Opc";
const geminiURL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

document.addEventListener("DOMContentLoaded", () => {
  let isWaiting = false;

  const chatButton = document.getElementById("chatbot-button");
  const chatWindow = document.getElementById("chat-window");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  chatButton.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
  });

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message || isWaiting) return;

    appendMessage("You", message);
    userInput.value = "";
    isWaiting = true;

    appendMessage("Seori", "⏳ Đang suy nghĩ...");

    try {
      const reply = await getGeminiReply(message);
      updateLastBotMessage(reply);
    } catch (err) {
      updateLastBotMessage("❌ Lỗi khi gọi Gemini API.");
      console.error(err);
    }

    isWaiting = false;
  });

  // Hàm thêm tin nhắn vào khung chat
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${sender}:</strong> <span class="msg-text">${text}</span>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Tự động cuộn xuống cuối
  }

  // Hàm cập nhật tin nhắn bot cuối cùng (ví dụ: thay thế "Đang suy nghĩ..." bằng câu trả lời)
  function updateLastBotMessage(text) {
    const lastMsg = chatMessages.querySelector(
      ".chat-message:last-child .msg-text"
    );
    if (lastMsg) lastMsg.textContent = text;
  }

  // Hàm gọi API Gemini
  async function getGeminiReply(message) {
    const response = await fetch(geminiURL + geminiApiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    if (!response.ok) {
        throw response; // Ném toàn bộ response để có thể đọc errorData ở catch
    }

    const data = await response.json();

    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Không nhận được phản hồi hợp lệ từ Gemini API.");
    }
  }
});
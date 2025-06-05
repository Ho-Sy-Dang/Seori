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

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${sender}:</strong> <span class="msg-text">${text}</span>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function updateLastBotMessage(text) {
    const lastMsg = chatMessages.querySelector(
      ".chat-message:last-child .msg-text"
    );
    if (lastMsg) lastMsg.textContent = text;
  }

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

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;
      if (content && content.parts && content.parts[0].text) {
        return content.parts[0].text.trim();
      }
    }

    throw new Error("No valid response from Gemini");
  }
});

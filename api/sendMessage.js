// Get environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;  // Fetch Telegram Bot Token from environment variables
const CHAT_ID = process.env.CHAT_ID;      // Fetch Telegram Chat ID from environment variables

function sendMessageToTelegram(message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const params = {
        chat_id: CHAT_ID,
        text: message,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Message sent to Telegram:", data);
    })
    .catch(error => {
        console.error("Error sending message to Telegram:", error);
    });
}

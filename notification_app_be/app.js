const express = require("express");
const fetchNotifications = require("./notificationService");
const getTopNotifications = require("./scheduler");

const app = express();

app.get("/notifications", async (req, res) => {
  try {
    const notifications = await fetchNotifications();

    const topNotifications =
      getTopNotifications(notifications);

    res.json(topNotifications);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


app.get("/developer-view", async (req, res) => {
  try {
    const notifications = await fetchNotifications();

    const grouped = {
      Placement: notifications.filter(
        n => n.Type === "Placement"
      ),

      Result: notifications.filter(
        n => n.Type === "Result"
      ),

      Event: notifications.filter(
        n => n.Type === "Event"
      )
    };

    res.json(grouped);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


const sendNotification =
require("./notificationSender");

app.get("/send", (req, res) => {

  const result =
    sendNotification(
      "Prathap",
      "Placement Alert"
    );

  res.json(result);
});
app.listen(3000, () => {
  console.log(
    "Server running on http://localhost:3000"
  );
});
function sendNotification(
  user,
  message
) {

  console.log(
    `Notification sent to ${user}`
  );

  return {
    success: true,
    message
  };
}

module.exports =
  sendNotification;
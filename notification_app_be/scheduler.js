const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getTopNotifications(notifications) {
  return notifications
    .sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 100);
}

module.exports = getTopNotifications;
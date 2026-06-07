function scheduleTasks(vehicles, depots) {
  const totalHours = depots.reduce(
    (sum, depot) => sum + depot.MechanicHours,
    0
  );

  let usedHours = 0;
  let totalImpact = 0;
  const scheduledTasks = [];

  for (const task of vehicles) {
    if (usedHours + task.Duration <= totalHours) {
      scheduledTasks.push(task.TaskID);
      usedHours += task.Duration;
      totalImpact += task.Impact;
    }
  }

  return {
    totalHours,
    usedHours,
    totalImpact,
    scheduledTasks
  };
}

module.exports = scheduleTasks;
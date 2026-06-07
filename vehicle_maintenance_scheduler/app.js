require("dotenv").config();

const axios = require("axios");
const scheduleTasks = require("./scheduler");

const TOKEN = process.env.TOKEN;
async function main() {
  try {
    const depotsResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/depots",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const vehiclesResponse = await axios.get(
      "http://4.224.186.213/evaluation-service/vehicles",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const depots = depotsResponse.data.depots;
    const vehicles = vehiclesResponse.data.vehicles;

    const result = scheduleTasks(vehicles, depots);

    console.log("Total Hours:", result.totalHours);
console.log("Used Hours:", result.usedHours);
console.log("Total Impact:", result.totalImpact);
console.log("Tasks Scheduled:", result.scheduledTasks.length);;

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );
  }
}

main();
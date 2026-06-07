const axios = require("axios");
const scheduleTasks = require("./scheduler");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwYnNAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTU3MDEsImlhdCI6MTc4MDgxNDgwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjJiMTIyNjQ0LWIxY2QtNDU5Zi05MWMyLWVjMTliMGFjOWI0MCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByYXRoYXAgYiBzIiwic3ViIjoiMjdhYzMwZTEtNDlmNS00M2JjLTkzMTctNWUwMjdjMDFjZDY0In0sImVtYWlsIjoicGJzQGdpdGFtLmluIiwibmFtZSI6InByYXRoYXAgYiBzIiwicm9sbE5vIjoiMjAyMzAwMzU3NSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjI3YWMzMGUxLTQ5ZjUtNDNiYy05MzE3LTVlMDI3YzAxY2Q2NCIsImNsaWVudFNlY3JldCI6Im5XanpxeUpQcXBna0h0ZGsifQ.Yi_rJYZdyG5NADinpw78DVvTqfiUZ0LjETgEowlyQQo";
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
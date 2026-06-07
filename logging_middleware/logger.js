const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwYnNAZ2l0YW0uaW4iLCJleHAiOjE3ODA4MTA3MjQsImlhdCI6MTc4MDgwOTgyNCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImMzMjNkNTJiLTE3NDMtNGRlOC1hNzFmLTkwNjg2ZDkyMzgzNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InByYXRoYXAgYiBzIiwic3ViIjoiMjdhYzMwZTEtNDlmNS00M2JjLTkzMTctNWUwMjdjMDFjZDY0In0sImVtYWlsIjoicGJzQGdpdGFtLmluIiwibmFtZSI6InByYXRoYXAgYiBzIiwicm9sbE5vIjoiMjAyMzAwMzU3NSIsImFjY2Vzc0NvZGUiOiJ3Z0t0Z1oiLCJjbGllbnRJRCI6IjI3YWMzMGUxLTQ5ZjUtNDNiYy05MzE3LTVlMDI3YzAxY2Q2NCIsImNsaWVudFNlY3JldCI6Im5XanpxeUpQcXBna0h0ZGsifQ.1gO7C-6KxMgCBgLU8ZEeo7cfzIQc2Xiom0Sk6d-zeHI";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

module.exports = Log;
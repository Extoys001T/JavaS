const axios = require("axios");
const cheerio = require("cheerio");

async function handler(url, headers) {
  let config = {
    headers: headers,
  };
  try {
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    console.log(error);
    return null; // handle error gracefully
  }
}

async function request(url, headers) {
  return await handler(url, headers);
}

async function bypass(hwid) {
  const url1 = "https://fluxteam.net/android/checkpoint/start.php?HWID=" + hwid;
  const headers1 = {
    Referer: "https://linkvertise.com/",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.3.6",
  };
  console.log("Bypass...");
  await request(url1, { Referer: "https://fluxteam.net/" });
  await request("https://fluxteam.net/android/checkpoint/check1.php", headers1);
  console.log(Bypass success.);
  const response = await request(
    "https://fluxteam.net/android/checkpoint/main.php",
    headers1
  );
  const $ = cheerio.load(response.data);
  const key = $("body > main > code").text().replace(/\s+/g, ""); // Extracting key from HTML
  console.log(Your key:, key);
}

// Run the bypass function with the HWID from the command line argument
bypass(process.argv[2]);​ (deleted: Yesterday at 5:49 am
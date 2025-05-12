const puppeteer = require("puppeteer");


const original_headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://shopeefood.vn',
    'priority': 'u=1, i',
    'referer': 'https://shopeefood.vn/',
    'sec-ch-ua': '"Not.A/Brand";v="99", "Chromium";v="136"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'x-foody-access-token': '',
    'x-foody-api-version': '1',
    'x-foody-app-type': '1004',
    'x-foody-client-id': '',
    'x-foody-client-language': 'vi',
    'x-foody-client-type': '1',
    'x-foody-client-version': '3.0.0',
  };
  
// Update this with your current eatery.
const EATERY_URL = "https://shopeefood.vn/ho-chi-minh/texas-chicken-hoang-van-thu"

async function crawlMenuFromEatery() {
 const browser = await puppeteer.launch({ headless: true }); // Set to true if you don't need a UI
  const page = await browser.newPage();

  // Listen for all network requests
  page.on("request", async (request) => {
    const url = request.url();
    const headers = request.headers();
    if (url.includes("get_delivery_dishes") && Object.keys(headers).length > 6) {
      const response = await fetch(url, { headers: {...original_headers, ...headers} });
      const data = await response.json();
      console.log({ headers, url, data, menu: data?.reply?.menu_infos })
      await browser.close()
    }
  });
  await page.goto(EATERY_URL);
}

crawlMenuFromEatery()
const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR!', err.toString()));
  
  console.log("Navigating to localhost:3000...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  console.log("Evaluating...");
  const text = await page.evaluate(() => document.body.innerHTML.substring(0, 500));
  console.log("Done");
  
  await browser.close();
})();

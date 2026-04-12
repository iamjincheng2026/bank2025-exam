const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('https://github.com/iamjincheng2026/bank2025-exam', { waitUntil: 'networkidle2', timeout: 30000 });
  // Wait for README to render
  await page.waitForSelector('article', { timeout: 10000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));
  // Get full page height
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  const height = Math.max(bodyHeight, 1600);
  await page.setViewport({ width: 1280, height: height });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ 
    path: '/Users/jincheng/WorkBuddy/20260411210755/github_bank2025-exam.png',
    fullPage: true,
    type: 'png'
  });
  console.log('Screenshot saved!');
  await browser.close();
})();

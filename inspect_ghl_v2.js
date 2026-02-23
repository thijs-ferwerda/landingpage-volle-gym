import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://api.leadconnectorhq.com/widget/booking/VJNpnvcHICgLsY8NxG8r', { waitUntil: 'networkidle0' });
  
  const metrics = await page.evaluate(() => {
    const el = document.querySelector('.hl-app') || document.body;
    return {
      padding: window.getComputedStyle(el).padding,
      margin: window.getComputedStyle(el).margin
    };
  });
  
  console.log('Calendar Metrics:', metrics);
  await browser.close();
})();

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://api.leadconnectorhq.com/widget/survey/yi2HMgCtZdzbGPakU69e?notrack=true', { waitUntil: 'networkidle0' });
  
  const html = await page.evaluate(() => {
    const btn = document.querySelector('button.ghl-btn, button');
    return btn ? btn.outerHTML : 'No button found';
  });
  
  console.log(html);
  await browser.close();
})();

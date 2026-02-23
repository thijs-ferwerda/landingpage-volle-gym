import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://api.leadconnectorhq.com/widget/survey/yi2HMgCtZdzbGPakU69e?notrack=true', { waitUntil: 'networkidle0' });
  
  const html = await page.evaluate(() => {
    // Find elements containing "1 of 10" or similar text
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      if (el.textContent && el.textContent.includes('1 of 10') && el.children.length === 0) {
        return {
          tag: el.tagName,
          className: el.className,
          id: el.id,
          parentClass: el.parentElement ? el.parentElement.className : 'no-parent'
        };
      }
    }
    return 'Not found';
  });
  
  console.log('Survey Progress Element:', html);
  await browser.close();
})();

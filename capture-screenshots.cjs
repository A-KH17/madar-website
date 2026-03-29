const { chromium } = require('playwright');
const path = require('path');

const DEMO_URL = 'https://demo-v2.madar.finance';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

const modules = [
  { name: 'cash', selector: '#page-cash', waitFor: '.card-hover' },
  { name: 'invoices', selector: '#page-invoices', waitFor: '.card-hover' },
  { name: 'collections', selector: '#page-collections', waitFor: '.card-hover' },
  { name: 'obligations', selector: '#page-obligations', waitFor: '.card-hover' },
  { name: 'forecast', selector: '#page-forecast', waitFor: '.card-hover' },
];

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });
    
    console.log(`Navigating to ${DEMO_URL}...`);
    await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait for login screen and enter credentials
    console.log('Logging in...');
    await page.waitForSelector('#loginEmail', { timeout: 10000 });
    await page.fill('#loginEmail', 'demo@madar.com');
    await page.fill('#loginPassword', 'demo123');
    await page.click('button[onclick="doLogin()"]');
    
    // Wait for dashboard to load
    console.log('Waiting for dashboard...');
    await page.waitForSelector('#appShell', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Capture Overview page (for Cash Dashboard)
    console.log('Capturing Cash Dashboard...');
    await page.waitForSelector('#page-overview', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // Take screenshot of the overview stats area
    const cashElement = await page.$('#page-overview .stat-grid');
    if (cashElement) {
      await cashElement.screenshot({ path: path.join(OUTPUT_DIR, 'module-cash-new.png') });
      console.log('✓ Cash dashboard captured');
    }
    
    // Navigate to Invoices page
    console.log('Navigating to Invoices...');
    await page.click('[data-page="invoices"]');
    await page.waitForTimeout(1500);
    
    const invoicesElement = await page.$('#page-invoices .card-hover');
    if (invoicesElement) {
      await invoicesElement.screenshot({ path: path.join(OUTPUT_DIR, 'module-invoices-new.png') });
      console.log('✓ Invoices captured');
    }
    
    // Navigate to Collections page
    console.log('Navigating to Collections...');
    await page.click('[data-page="collections"]');
    await page.waitForTimeout(1500);
    
    const collectionsElement = await page.$('#page-collections .card-hover');
    if (collectionsElement) {
      await collectionsElement.screenshot({ path: path.join(OUTPUT_DIR, 'module-collections-new.png') });
      console.log('✓ Collections captured');
    }
    
    // Navigate to Obligations page
    console.log('Navigating to Obligations...');
    await page.click('[data-page="obligations"]');
    await page.waitForTimeout(1500);
    
    const obligationsElement = await page.$('#page-obligations .card-hover');
    if (obligationsElement) {
      await obligationsElement.screenshot({ path: path.join(OUTPUT_DIR, 'module-obligations-new.png') });
      console.log('✓ Obligations captured');
    }
    
    // Navigate to Forecast page
    console.log('Navigating to Forecast...');
    await page.click('[data-page="forecast"]');
    await page.waitForTimeout(1500);
    
    const forecastElement = await page.$('#page-forecast .card-hover');
    if (forecastElement) {
      await forecastElement.screenshot({ path: path.join(OUTPUT_DIR, 'module-forecast-new.png') });
      console.log('✓ Forecast captured');
    }
    
    console.log('\n✅ All screenshots captured successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots();

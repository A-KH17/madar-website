const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const DEMO_URL = 'https://demo-v2.madar.finance';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();
    
    console.log(`Navigating to ${DEMO_URL}...`);
    await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Wait for login screen and enter credentials
    console.log('Logging in...');
    await page.waitForSelector('#loginEmail', { timeout: 15000 });
    await page.fill('#loginEmail', 'demo@madar.com');
    await page.fill('#loginPassword', 'demo123');
    await page.click('button[onclick="doLogin()"]');
    
    // Wait for dashboard to load
    console.log('Waiting for dashboard...');
    await page.waitForSelector('#appShell:not(.hidden)', { timeout: 15000 });
    await page.waitForTimeout(3000);
    
    // Capture Overview page (Cash Dashboard view)
    console.log('Capturing Cash Dashboard...');
    await page.waitForSelector('#page-overview.active', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Take screenshot of the stats grid area with proper clipping
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-cash.png'),
      clip: { x: 300, y: 100, width: 1000, height: 500 }
    });
    console.log('✓ Cash dashboard captured');
    
    // Navigate to Invoices page
    console.log('Navigating to Invoices...');
    await page.evaluate(() => showPage('invoices'));
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-invoices.png'),
      clip: { x: 300, y: 100, width: 1000, height: 500 }
    });
    console.log('✓ Invoices captured');
    
    // Navigate to Collections page
    console.log('Navigating to Collections...');
    await page.evaluate(() => showPage('collections'));
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-collections.png'),
      clip: { x: 300, y: 100, width: 1000, height: 500 }
    });
    console.log('✓ Collections captured');
    
    // Navigate to Obligations page
    console.log('Navigating to Obligations...');
    await page.evaluate(() => showPage('obligations'));
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-obligations.png'),
      clip: { x: 300, y: 100, width: 1000, height: 500 }
    });
    console.log('✓ Obligations captured');
    
    // Navigate to Forecast page
    console.log('Navigating to Forecast...');
    await page.evaluate(() => showPage('forecast'));
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-forecast.png'),
      clip: { x: 300, y: 100, width: 1000, height: 500 }
    });
    console.log('✓ Forecast captured');
    
    // Clean up temp files
    const files = fs.readdirSync(OUTPUT_DIR);
    files.forEach(f => {
      if (f.includes('-new.png')) {
        fs.unlinkSync(path.join(OUTPUT_DIR, f));
      }
    });
    
    console.log('\n✅ All screenshots captured successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshots();

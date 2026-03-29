const { chromium } = require('playwright');
const path = require('path');

const DEMO_URL = 'https://demo-v2.madar.finance';
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2 // Retina quality
    });
    const page = await context.newPage();
    
    console.log(`Navigating to ${DEMO_URL}...`);
    await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 60000 });
    
    // Login
    console.log('Logging in...');
    await page.waitForSelector('#loginEmail', { timeout: 15000 });
    await page.fill('#loginEmail', 'demo@madar.com');
    await page.fill('#loginPassword', 'demo123');
    await page.click('button[onclick="doLogin()"]');
    
    // Wait for dashboard
    console.log('Waiting for dashboard...');
    await page.waitForSelector('#appShell:not(.hidden)', { timeout: 15000 });
    await page.waitForTimeout(3000);
    
    // Capture 1: Cash Dashboard (Overview page)
    console.log('Capturing Cash Dashboard...');
    await page.waitForSelector('#page-overview.active', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Full page screenshot of the main content area
    const cashCard = await page.$('.card-hover:has-text("SAR")');
    if (cashCard) {
      await cashCard.screenshot({ path: path.join(OUTPUT_DIR, 'module-cash.png') });
    } else {
      // Fallback: screenshot the main content area
      await page.screenshot({ 
        path: path.join(OUTPUT_DIR, 'module-cash.png'),
        clip: { x: 280, y: 80, width: 1140, height: 700 }
      });
    }
    console.log('✓ Cash dashboard captured');
    
    // Navigate to Invoices
    console.log('Navigating to Invoices...');
    await page.click('[data-page="invoices"]');
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-invoices.png'),
      clip: { x: 280, y: 80, width: 1140, height: 700 }
    });
    console.log('✓ Invoices captured');
    
    // Navigate to Collections
    console.log('Navigating to Collections...');
    await page.click('[data-page="collections"]');
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-collections.png'),
      clip: { x: 280, y: 80, width: 1140, height: 700 }
    });
    console.log('✓ Collections captured');
    
    // Navigate to Obligations
    console.log('Navigating to Obligations...');
    await page.click('[data-page="obligations"]');
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-obligations.png'),
      clip: { x: 280, y: 80, width: 1140, height: 700 }
    });
    console.log('✓ Obligations captured');
    
    // Navigate to Forecast
    console.log('Navigating to Forecast...');
    await page.click('[data-page="forecast"]');
    await page.waitForTimeout(2500);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, 'module-forecast.png'),
      clip: { x: 280, y: 80, width: 1140, height: 700 }
    });
    console.log('✓ Forecast captured');
    
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
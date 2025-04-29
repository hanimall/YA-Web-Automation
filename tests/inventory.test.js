const { visualUsername, validPassword } = require('../config');
const { Builder, until, Capabilities } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const resemble = require('resemblejs');
const fs = require('fs');
const path = require('path');

describe('SauceDemo - Inventory tests', () => {
  let driver;
  let loginPage;
  let inventoryPage;

  beforeAll(async () => {
    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('goog:chromeOptions', {
      args: [
        '--headless=new',
        '--window-size=1920,1080'
      ]
    });

    driver = await new Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities)
      .build();
      
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  }, 10000);

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Problem user should have incorrect cart position', async () => {
    await loginPage.open();
    await loginPage.login(visualUsername, validPassword);

    const cartPosition = await inventoryPage.getCartPosition();

    expect(cartPosition.x).toBeGreaterThan(1500); 
    expect(cartPosition.y).toBeLessThan(50); 
  }, 30000);

  test('Should detect image mismatch between header and reference', async () => {
    await loginPage.open();
    await loginPage.login(visualUsername, validPassword);
  
    const headerElement = await inventoryPage.getHeader();
    await driver.wait(until.elementIsVisible(headerElement), 5000);
    await driver.sleep(1000); // wait for everything to load
  
    const headerScreenshot = await inventoryPage.taheHeaderScreenshot();
    const screenshotPath = await inventoryPage.saveHeaderScreenshot(headerScreenshot);

    const referenceImagePath = path.join(__dirname, '../screenshots/references/header-ref.png');
    const outputDiffPath = path.join(__dirname, '../screenshots/differences/header-diff.png');


    const result = await compareImagesAndSaveDifferences(screenshotPath, referenceImagePath,outputDiffPath);
    fs.unlinkSync(screenshotPath);
    
    expect(parseFloat(result.diff.misMatchPercentage)).toBeGreaterThan(0);

  }, 30000);


});


function compareImagesAndSaveDifferences(imagePath1, imagePath2, outputDiffPath) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete((data) => {
        if (data.misMatchPercentage > 0) {
          fs.writeFileSync(outputDiffPath, data.getImageDataUrl().replace(/^data:image\/png;base64,/, ''), 'base64');
          console.log("missmatch percentage : ", data.misMatchPercentage, "%");
          resolve({ equal: false, diff: data });
        } else {
          resolve({ equal: true, diff: data });
        }
      });
  });
}

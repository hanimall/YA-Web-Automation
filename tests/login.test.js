const { validUsername, validPassword, lockedOutUsername } = require('../config');
const { Builder, until, Capabilities } = require('selenium-webdriver');
const LoginPage = require('../pages/LoginPage');

describe('SauceDemo Login Tests', () => {
  let driver;
  let loginPage;

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
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.open();
    await loginPage.login(validUsername, validPassword);
    await driver.wait(until.urlContains('/inventory.html'), 5000);
  });

  test('Failed login with locked out user', async () => {
    await loginPage.open();
    await loginPage.login(lockedOutUsername, validPassword);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface');
  });
});

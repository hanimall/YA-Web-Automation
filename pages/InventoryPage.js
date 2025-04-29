const { By, until } = require('selenium-webdriver');

const fs = require('fs');
const path = require('path');

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.cartButton = By.id('shopping_cart_container');
    this.header = By.css('div[data-test="primary-header"]');

  }

  async getCartPosition() {
    const cart = await this.driver.findElement(this.cartButton);
    return await cart.getRect(); // x, y, width, height
  }

  async getHeader() {
    // Wait for document to be ready
    await this.driver.executeScript('return document.readyState === "complete"');
    
    // Wait for header to be visible
    await this.driver.wait(until.elementLocated(this.header), 5000);
    const element = await this.driver.findElement(this.header);
    await this.driver.wait(until.elementIsVisible(element), 5000);
    
    return element;
  }

  async taheHeaderScreenshot() {
    const headerElement = await this.getHeader();
    const headerScreenshot = await headerElement.takeScreenshot(true);
    return headerScreenshot;
  }

  async saveHeaderScreenshot(screenshot) {
    const screenshotPath = path.join(__dirname, '../screenshots/header.png');
    fs.writeFileSync(screenshotPath, screenshot, 'base64');
    return screenshotPath;
  }
}

module.exports = InventoryPage;

const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id('user-name');
    this.passwordField = By.id('password');
    this.loginButton = By.id('login-button');
    this.errorMessage = By.css('h3[data-test="error"]');
  }

  async open() {
    await this.driver.get('https://www.saucedemo.com/');
    await this.driver.wait(until.elementLocated(this.usernameField), 10000);
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameField).sendKeys(username);
    await this.driver.findElement(this.passwordField).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getErrorMessage() {
    await this.driver.wait(until.elementLocated(this.errorMessage), 10000);
    const errorElement = await this.driver.findElement(this.errorMessage);
    return await errorElement.getText();
  }
}

module.exports = LoginPage;

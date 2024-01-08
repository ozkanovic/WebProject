const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Default Suite', function() {
  this.timeout(8000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('register', async function() {
    await driver.get("https://www.dopinger.com/tr/");
    await driver.manage().window().setRect({ width: 699, height: 543 });

    await driver.findElement(By.css(".navbar-toggler")).click();
    await driver.sleep(1000); // Sayfa geçişini beklemek için 1 saniye bekleme ekledim

    const menuIcon = await driver.findElement(By.css(".icon-bar:nth-child(3)"));
    await driver.actions({ bridge: true }).moveToElement(menuIcon).perform();

    await driver.sleep(1000); // Sayfa geçişini beklemek için 1 saniye bekleme ekledim

    await driver.findElement(By.css(".nav-link:nth-child(3) > .text-nowrap")).click();

    const usernameInput = await driver.findElement(By.id("mat-input-0"));
    await usernameInput.sendKeys("SirJohnson");

    const emailInput = await driver.findElement(By.id("mat-input-1"));
    await emailInput.sendKeys("test987@test.com");

    const passwordInput = await driver.findElement(By.id("mat-input-2"));
    await passwordInput.sendKeys("123456789");

    const confirmPasswordInput = await driver.findElement(By.id("mat-input-3"));
    await confirmPasswordInput.sendKeys("123456789");

    const checkbox = await driver.findElement(By.css(".mat-checkbox-inner-container"));
    await checkbox.click();

    const submitButton = await driver.findElement(By.css(".mat-raised-button > .mat-button-wrapper"));
    await submitButton.click();

    await driver.executeScript("window.scrollTo(0,72)");

    const dropdownMenu = await driver.findElement(By.css(".p-element > .pi-angle-down"));
    await dropdownMenu.click();

    const logoutButton = await driver.findElement(By.css(".ng-tns-c64-3:nth-child(1) > .p-menuitem-link > .p-menuitem-text"));
    await logoutButton.click();
  });
});

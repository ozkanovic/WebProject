const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('register', function() {
  this.timeout(30000);
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('register', async function() {
    let success = true;
    try {
      await driver.get("https://www.dopinger.com/tr/");
      await driver.manage().window().setRect({ width: 699, height: 543 });
  
      await waitFor(1000);
  
      const iconBarShortElement = await driver.findElement(By.css(".icon-bar-short"));
      await driver.actions({ bridge: true }).moveToElement(iconBarShortElement).perform();
      await iconBarShortElement.click();
  
      await waitFor(1000);
  
      const registerLink = await driver.findElement(By.css(".nav-link:nth-child(3) > .text-nowrap"));
      await registerLink.click();
      await waitForPageLoad();
  
      const usernameInput = await driver.findElement(By.id("mat-input-0"));
      await usernameInput.click();
      await usernameInput.sendKeys("legolas");
  
      const emailInput = await driver.findElement(By.id("mat-input-1"));
      await emailInput.click();
      await emailInput.sendKeys("aragorn123@test.com");
  
      const passwordInput = await driver.findElement(By.id("mat-input-2"));
      await passwordInput.click();
      await passwordInput.sendKeys("12345678");
  
      const confirmPasswordInput = await driver.findElement(By.id("mat-input-3"));
      await confirmPasswordInput.sendKeys("12345678");
  
      const checkbox = await driver.findElement(By.css(".mat-checkbox-inner-container"));
      await checkbox.click();
  
      const submitButton = await driver.findElement(By.css(".mat-raised-button > .mat-button-wrapper"));
      await submitButton.click();
  
      await waitFor(1000);
  
      const dropdownMenu = await driver.findElement(By.css(".p-element > .pi-angle-down"));
      await dropdownMenu.click();
  
      const logoutButton = await driver.findElement(By.css(".ng-tns-c64-3:nth-child(1) > .p-menuitem-link > .p-menuitem-text"));
      await logoutButton.click();
  
      const currentUrl = await driver.getCurrentUrl();
      assert.equal(currentUrl, "https://www.dopinger.com/panel/dashboard");
  
    } catch (error) {
      console.error('Hata oluştu:', error.message);
      success = false;
      assert.fail('Test başarısız: ' + getCustomErrorMessage(error.message));
    } finally {
      if (success) {
        await finishProcess();
      }
    }
  });
});

// Özelleştirilmiş hata mesajlarını döndüren fonksiyon:
function getCustomErrorMessage(errorMessage) {
  switch (errorMessage) {
    case "no such element":
      return "Beklenen element bulunamadı.";
    case "element not clickable":
      return "Elemente tıklanamadı.";
    default:
      return "Bir hata oluştu.";
  }
}

// Sayfanın yüklenmesini bekleyen fonksiyon örneği:
async function waitForPageLoad() {
  await driver.wait(until.urlContains('https://www.dopinger.com/panel/dashboard'), 5000);
}

// Bekleme fonksiyonu:
async function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Test başarıyla tamamlandığında çalışacak fonksiyon:
async function finishProcess() {
  console.log("İşlem başarıyla tamamlandı.");
}

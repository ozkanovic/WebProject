const { Builder, By } = require('selenium-webdriver');

describe('register', function() {
  this.timeout(5000);
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

    
    await driver.sleep(5000);

    const iconBarShortElement = await driver.findElement(By.css(".icon-bar-short"));
    await driver.actions({ bridge: true }).moveToElement(iconBarShortElement).perform();
    await iconBarShortElement.click();

    
    await driver.sleep(5000);

    //Dopinger ana sayfasına yönlendikten sonraki kayıt olma senaryoları:
    await driver.findElement(By.css(".nav-link:nth-child(3) > .text-nowrap")).click();
    await driver.findElement(By.id("mat-input-0")).click();
    await driver.findElement(By.id("mat-input-0")).sendKeys("legolasS");
    await driver.findElement(By.id("mat-input-1")).click();
    await driver.findElement(By.id("mat-input-1")).sendKeys("aragorn1233@test.com");
    await driver.findElement(By.id("mat-input-2")).click();
    await driver.findElement(By.id("mat-input-2")).sendKeys("12345678");
    await driver.findElement(By.id("mat-input-3")).sendKeys("12345678");
    await driver.findElement(By.css(".mat-checkbox-inner-container")).click();
    await driver.findElement(By.css(".mat-raised-button > .mat-button-wrapper")).click();
    await driver.findElement(By.css(".p-element > .pi-angle-down")).click();
    await driver.findElement(By.css(".ng-tns-c64-3:nth-child(1) > .p-menuitem-link > .p-menuitem-text")).click();

    
    // Sayfanın geçilen bir bölüme yönlendirdiğini kontrol etmek için assert işlemi:
     const currentUrl = await driver.getCurrentUrl();
     assert.equal(currentUrl, "https://www.dopinger.com/panel/dashboard");
  });
});

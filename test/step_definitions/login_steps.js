const { When, Then, setDefaultTimeout} = require('cucumber');
const { expect } = require('chai');
const { element } = require('protractor');

setDefaultTimeout(60000);

When('I open {string} url', function(url) {
    browser.get(url);
    browser.manage().window().maximize();
});


When('I login with {string} email and {string} password', async function(email, password) {
   await element(by.id('myAccountDropdown')).click();
   browser.sleep(2000);
   await element(by.xpath('//a[.="Sign In"]')).click();
   await element(by.className('qa-email-textbox')).sendKeys(email);
   await element(by.className('qa-password-textbox')).sendKeys(password);
   browser.sleep(5000);
   await element(by.id('signin')).click();
});

When('I wait "{int}" seconds', function(timeinSeconds) {
    return browser.sleep(timeinSeconds*1000);
});


Then('User name {string} is displayed on a page', async function(user_name) {
    await element(by.id('myAccountDropdown')).click();
    browser.sleep(5000);
    const name = await element(by.className('tiqiyps')).getText();
    expect(name).to.be.equal('Hi '+ user_name);
});
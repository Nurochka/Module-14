const { When, Then, setDefaultTimeout} = require('cucumber');
const { expect } = require('chai');
const { element } = require('protractor');

setDefaultTimeout(60000);

When('I search for {string}', async function(clothes) {
 
    await element(by.id('chrome-search')).sendKeys(clothes);
    await element(by.className('kH5PAAC _1KRfEms')).click();
    browser.sleep(2000);
    if (await element(by.className('_1M-cSy1 yk-nJ7N')).isPresent()){  //to close pop-up if appears
        await element(by.className('_1M-cSy1 yk-nJ7N')).click();
        browser.sleep(2000);
        await element(by.className('glYZgHa')).click();
    } 
 });
 
 When('I filter search results by {string} value', async function(discount) {
    await element(by.buttonText('Discount %')).click();
    browser.sleep(2000);
    const listOfElements = element.all(by.className('kx2nDmW'));
    const arrayOfElementTexts = await listOfElements.getText();
    const withoutCounter = arrayOfElementTexts.map(el => el.slice(0,9));
    const elementToClickIndex = withoutCounter.indexOf(discount);
    return await listOfElements.get(elementToClickIndex).click();     
});    
 
 Then('Filtered search results should have {string} in name', async function(item) {
     const name = await element(by.className('_3J74XsK')).getText();
     expect(name).to.include(item);
 });
 
 Then('Filtered search results should be more than {string} and less than {string}', async function(discount1, discount2) {
     const amount = Math.abs(parseFloat(await element(by.className('_1MVUcS8')).getText()));
     expect(amount).to.be.above(parseFloat(discount1)).and.to.be.below(parseFloat(discount2));
 });



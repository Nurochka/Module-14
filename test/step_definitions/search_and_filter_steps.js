const { When, Then, setDefaultTimeout} = require('cucumber');
const { expect } = require('chai');
const PageFactory = require('../page_objects/page_factory');

const pageFactory = new PageFactory();

setDefaultTimeout(60000);

When('I search for {string}', async function(clothes) {
    const page = await pageFactory.getPage();
    await page.SearchField.EnterText(clothes);
    await page.SearchIcon.click(); 
    if (await page.ButtonOnPopUp.isPresent()){  //to close pop-up if appears
        await page.ButtonOnPopUp.click();
        browser.sleep(2000);
        await page.CloseIconOnPopUp.click();
    } 
 });
 
 When('I filter search results by {string} value', async function(discount) {
    const page = await pageFactory.getPage();
    await page.Menu.DiscountFilter.click(); 
    const listOfElements = await page.Menu.DiscountValues;
    return await listOfElements.clickElementByText(discount);     
});    
 
 Then('Filtered search results should have {string} in name', async function(item) {
    const page = await pageFactory.getPage(); 
    const name = await page.FirstSearchResultText.getText();
    expect(name).to.include(item);
 });
 
 Then('Filtered search results should be more than {string} and less than {string}', async function(discount1, discount2) {
    const page = await pageFactory.getPage();  
    const amount = Math.abs(parseFloat(await page.FirstSearchResultDiscount.getText()));
    expect(amount).to.be.at.least(parseFloat(discount1)).and.to.be.at.most(parseFloat(discount2));
 });



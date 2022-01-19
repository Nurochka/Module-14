const { When, Then, setDefaultTimeout} = require('cucumber');
const { expect } = require('chai');
const PageFactory = require('../page_objects/page_factory');
//const data = require('../data/test_data.json');

const pageFactory = new PageFactory();

setDefaultTimeout(60000);

When('I open {string} page', async function(pageName) {
    const page = await pageFactory.getPage(pageName);
    return page.open();    
});

When('I login with {string} email and {string} password', async function(email, password) {
    const page = await pageFactory.getPage();
    await page.MyAccount.click();
    browser.sleep(2000);    
    await page.SignInLink.click();   
    await page.Email.EnterText(email);  
    await page.Password.EnterText(password);
    await page.SignInButton.click();    
});

When('I wait "{int}" seconds', async function(timeinSeconds) {
    const page = await pageFactory.getPage();
    return page.wait(timeinSeconds * 1000);
});


Then('User name {string} is displayed on a page', async function(user_name) {
    const page = await pageFactory.getPage();
    await page.MyAccount.click();
    browser.sleep(2000);
    const name = await page.UserName.getText();
    expect(name).to.be.equal('Hi '+ user_name);
});
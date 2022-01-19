const { logger } = require('../../config/logger_config');
const Element = require('../base_elements/base_element');

class BasePage {
  constructor(pageName, pageUrl) {
    this.pageName = pageName;
    this.pageUrl = pageUrl;
    //this.MyAccount = new Element('MyAccount', 'id', 'myAccountDropdown');
    this.MyAccount = new Element('MyAccount', 'className', '_3iG3MJz');
    this.SignInLink = new Element('SignInLink', 'xpath', '//a[.="Sign In"]');
    this.Email = new Element('Email', 'className', 'qa-email-textbox');
    this.Password = new Element('Password', 'className', 'qa-password-textbox');
    this.SignInButton = new Element('SignInButton', 'id', 'signin');
    this.UserName = new Element('UserName', 'className', 'tiqiyps');
    this.SearchField = new Element('SearchField', 'id', 'chrome-search');
    this.SearchIcon = new Element('SearchIcon', 'className', 'kH5PAAC _1KRfEms');  
  };

  getElement(targetElementName) {
    const targetElement = this.pageElements.find(element => element.elementName === targetElementName);
    if (targetElement) {
      return targetElement;
    } else {
      throw new Error(`No element with ${targetElementName} name found on [${this.pageName}] page`);
    }
  };  

  wait(waitTimeInMilliseconds) {
    logger.debug(`Waiting [${waitTimeInMilliseconds}] milliseconds`);
    return browser.sleep(waitTimeInMilliseconds);
  };

  async getCurrentUrl() {
    const currentUrl = await browser.getCurrentUrl();
    logger.debug(`Current url is [${currentUrl}]`);
    return currentUrl;
  };

  openUrl(url) {
    logger.debug(`Opening [${url}] url`);
    return browser.get(url);
  };

  open() {
    logger.debug(`Opening [${this.pageUrl}] url`);
    return browser.get(this.pageUrl);       
  };
};

module.exports = BasePage;

const { logger } = require('../../config/logger_config');
const { element } = require('protractor');

class Element {
    constructor(elementName, selectorType, selector) {
        if (selectorType === 'className'){
            this.element = element(by.className(selector));
        } else if (selectorType === 'id') {
            this.element = element(by.id(selector));
            } else if (selectorType === 'xpath') {
                this.element = element(by.xpath(selector));
            } else if (selectorType === 'buttonText') {
                this.element = element(by.buttonText(selector));
            }
        this.elementName = elementName;
    }
    
    click() {
        logger.info(`Clicking "${this.elementName}"`);
        return this.element.click();        
    };

    EnterText(text) {
        logger.info(`Searching for ` + text);
        return this.element.sendKeys(text);        
    };

    async getText() {
        const elementText = await this.element.getText();
        logger.info(`"${this.elementName}" element text is ${elementText}`);
        return elementText;
    };

    async isPresent(){
        logger.info(`Checking presence of "${this.elementName}"`);
        return await this.element.isPresent();
    }
};

module.exports = Element;
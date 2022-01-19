const { logger } = require('../../config/logger_config');
const { element } = require('protractor');

class Collection {
    constructor(elementName, selectorType, selector) {
        if (selectorType === 'className'){
            this.collection = element.all(by.className(selector));
        } else {
            this.collection = element.all(by.css(selector));}
        this.elementName = elementName;
    };

    async getCount() {
        const collectionCount = await this.collection.count();
        logger.debug(`Count of "${this.elementName}" is "${collectionCount}"`); 
        return collectionCount;
    };

    async getText() {
        const arrayOfCollectionTexts = await this.collection.getText();
        logger.info(`Texts of "${this.elementName}" are [${arrayOfCollectionTexts}]`);
        return arrayOfCollectionTexts;
    };

    async getTextofElementsWithoutCounterValue() {
        const arrayOfCollectionTexts = await this.getText();
        logger.info(`Texts of "${this.elementName}" are [${arrayOfCollectionTexts}]`);
        const withoutCounter = arrayOfCollectionTexts.map(el => el.slice(0,9));
        return withoutCounter;
    };

    async getElementIndexByText(text) {
        const withoutCounter = await this.getTextofElementsWithoutCounterValue();
        const matchingTextIndex = withoutCounter.indexOf(text);
        logger.debug(`Element with [${text}] text index is [${matchingTextIndex}]`);
          return matchingTextIndex;
    };

    async clickElementByText(text) {
        const indexOfElementToClick = await this.getElementIndexByText(text);
        logger.debug(`Clicking [${this.name}] element with [${indexOfElementToClick}] index`)
        return this.collection.get(indexOfElementToClick).click();
      };
};

module.exports = Collection;
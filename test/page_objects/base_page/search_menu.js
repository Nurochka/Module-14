const Element = require('../base_elements/base_element');
const Collection = require('../base_elements/base_collection');

class Menu{
    constructor() {
        this.DiscountFilter = new Element('DiscountFilter', 'buttonText', 'Discount %'),
        this.DiscountValues = new Collection('DiscountValues', 'className', 'kx2nDmW')
    };
};

module.exports = Menu;
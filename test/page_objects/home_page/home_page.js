const BasePage = require('../base_page/base_page');
const Element = require('../base_elements/base_element');
const Menu = require('../base_page/search_menu');

class HomePage extends BasePage {
  constructor() {
    super('Home', 'https://www.asos.com/');
    this.Menu = new Menu();     
    this.ButtonOnPopUp = new Element('ButtonOnPopUp', 'className', '_1M-cSy1 yk-nJ7N');
    this.CloseIconOnPopUp = new Element('CloseIconOnPopUp', 'className', 'glYZgHa');
    this.FirstSearchResultText = new Element('FirstSearchResultText', 'className', '_3J74XsK');
    this.FirstSearchResultDiscount = new Element('FirstSearchResultDiscount', 'className', '_1MVUcS8');
  };
};

module.exports = HomePage;
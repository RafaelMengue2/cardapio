// models/menu.js
const menuItems = [];

class MenuItem {
  constructor(name, description, price, preparationTime, category, image) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.preparationTime = preparationTime;
    this.category = category;
    this.image = image;
  }

  static addItem(name, description, price, preparationTime, category, image) {
    const item = new MenuItem(name, description, price, preparationTime, category, image);
    menuItems.push(item);
    return item;
  }

  static getMenu() {
    return menuItems;
  }
}

module.exports = MenuItem;

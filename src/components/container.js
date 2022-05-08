import Control from "./control.js";

class Container extends Control {
  constructor(parent) {
    super(parent, "div", "container");
    this.title = new Control(this.element, "h1", "title");
    this.title.element.innerHTML = "Virtual Keyboard for Windows OS";
    // this.changeLanguage = new Control(this.element, "p", "description");
    // this.changeLanguage.element.innerHTML = "ALT + SHIFT - change language";
  }
}

const createContainer = () => new Container(document.body);

export default createContainer;

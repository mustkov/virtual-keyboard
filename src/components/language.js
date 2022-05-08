import Control from "./control.js";

class Language extends Control {
  constructor(parent) {
    super(parent, "div", "language");
    this.changeLanguage = new Control(this.element, "p", "description");
    this.changeLanguage.element.innerHTML = "ALT + SHIFT - change language";
  }
}

const createLanguage = () => new Language(document.querySelector(".container"));

export default createLanguage;

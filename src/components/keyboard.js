import Control from "./control.js";
import keys from "./keys.js";

class Keyboard extends Control {
  constructor(parent) {
    super(parent, "div", "keyboard");
    keys.forEach((el) => {
      this.row = new Control(this.element, "div", "row");
      for (let index = 0; index < el.length; index++) {
        this.btn = new Control(
          this.row.element,
          "button",
          `${el[index].class}`
        );
        this.btn.element.textContent = `${el[index].key.en}`;
      }
    });
  }
}

const createKeyboard = () => new Keyboard(document.querySelector(".container"));
export default createKeyboard;

import Control from "./control.js";

class Input extends Control {
  constructor(parent) {
    super(parent, "form", "form");
    this.input = new Control(this.element, "textarea", "input");
    this.input.element.readonly = true;
  }
}

const createInput = () => new Input(document.querySelector(".container"));

export default createInput;

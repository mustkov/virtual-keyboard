export default class Control {
  constructor(parent, tag, name) {
    this.element = document.createElement(tag);
    this.element.className = name;
    parent.append(this.element);
  }

  remove() {
    this.node.remove();
  }
}

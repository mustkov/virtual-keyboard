import createContainer from "./components/container.js";
import createInput from "./components/input.js";
import createKeyboard from "./components/keyboard.js";
import keys from "./components/keys.js";
import createLanguage from "./components/language.js";

createContainer();
createInput();
createKeyboard();
createLanguage();

const row = document.querySelectorAll(".row");
const input = document.querySelector(".input");
const capsLock = document.querySelector(".CapsLock");

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    const language = localStorage.getItem("language");
    if (language === "en") {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < row[i].children.length; j++) {
          if (
            !capsLock.classList.contains("key_caps") &&
            row[i].children[j].textContent.length === 1
          ) {
            row[i].children[j].innerHTML = keys[i][j].key.en;
          } else if (row[i].children[j].textContent.length === 1) {
            row[i].children[j].innerHTML = keys[i][j].key.en.toUpperCase();
          }
        }
      }
      document.querySelector(".key_lang").textContent = "en";
    } else {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < row[i].children.length; j++) {
          if (
            !capsLock.classList.contains("key_caps") &&
            row[i].children[j].textContent.length === 1
          ) {
            row[i].children[j].innerHTML = keys[i][j].key.ru;
          } else if (row[i].children[j].textContent.length === 1) {
            row[i].children[j].innerHTML = keys[i][j].key.ru.toUpperCase();
          }
        }
      }
      document.querySelectorAll(".key_lang").textContent == "ru";
    }
  }
  if (localStorage.getItem("checkCaps")) {
    const capButton = localStorage.getItem("checkCaps");
    if (capButton === "true") {
      capsLock.classList.add("key_caps");
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < row[i].children.length; j++) {
          if (row[i].children[j].textContent.length === 1) {
            row[i].children[j].innerHTML =
              row[i].children[j].innerHTML.toUpperCase();
          }
        }
      }
    }
  }
}

window.addEventListener("load", getLocalStorage);

let language = null;

if (localStorage.getItem("language") === "ru") {
  language = "ru";
} else {
  language = "en";
}

let checkCaps = null;
if (localStorage.getItem("checkCaps") === "true") {
  checkCaps = true;
} else {
  checkCaps = false;
}

let shiftButton = false;
input.focus();
let cursor = input.selectionStart;

const shiftDown = () => {
  if (!capsLock.classList.contains("key_caps")) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (Object.keys(keys[i][j]).includes("shift")) {
          row[i].children[j].innerHTML = keys[i][j].shift[language];
        }
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (
          Object.keys(keys[i][j]).includes("shift") &&
          row[i].children[j].textContent.length === 1
        ) {
          row[i].children[j].innerHTML =
            keys[i][j].shift[language].toLowerCase();
        }
      }
    }
  }
};

const shiftUp = () => {
  if (!capsLock.classList.contains("key_caps")) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (Object.keys(keys[i][j]).includes("shift")) {
          row[i].children[j].innerHTML = keys[i][j].key[language];
        }
      }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (row[i].children[j].textContent.length === 1) {
          row[i].children[j].innerHTML = keys[i][j].key[language].toLowerCase();
        }
      }
    }
  }
};

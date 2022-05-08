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

const shiftChange = (e) => {
  if (e.type === "keydown") {
    shiftDown();
  }
  if (e.type === "keyup") {
    shiftUp();
  }
};

const tabChange = () => {
  if (input.selectionStart !== input.selectionEnd) {
    let text = [...input.value];
    text.splice(
      input.selectionStart,
      input.selectionEnd - input.selectionStart,
      "    "
    );
    text = text.join("");
    input.value = text;
    cursor += 4;
    input.setSelectionRange(cursor, cursor);
  } else {
    input.setSelectionRange(cursor, cursor);
    let text = [...input.value];
    text.splice(cursor, 0, "    ");
    text = text.join("");
    input.value = text;
    cursor += 4;
    input.setSelectionRange(cursor, cursor);
  }
};

const backspaceChange = () => {
  if (input.value.length !== 0 && cursor !== 0) {
    if (input.selectionStart !== input.selectionEnd) {
      let text = [...input.value];
      text.splice(
        input.selectionStart,
        input.selectionEnd - input.selectionStart
      );
      text = text.join("");
      input.value = text;
      input.setSelectionRange(cursor, cursor);
    } else {
      input.setSelectionRange(cursor, cursor);
      let text = [...input.value];
      text.splice(cursor - 1, 1);
      text = text.join("");
      input.value = text;
      cursor -= 1;
      input.setSelectionRange(cursor, cursor);
    }
  }
};

const deleteChange = () => {
  if (input.selectionStart !== input.value.length) {
    if (input.selectionStart !== input.selectionEnd) {
      let text = [...input.value];
      text.splice(
        input.selectionStart,
        input.selectionEnd - input.selectionStart
      );
      text = text.join("");
      input.value = text;
      input.setSelectionRange(cursor, cursor);
    } else {
      let text = [...input.value];
      text.splice(cursor, 1);
      text = text.join("");
      input.value = text;
      input.setSelectionRange(cursor, cursor);
    }
  }
};

const enterChange = () => {
  if (input.selectionStart !== input.selectionEnd) {
    let text = [...input.value];
    text.splice(
      input.selectionStart,
      input.selectionEnd - input.selectionStart,
      "\n"
    );
    text = text.join("");
    input.value = text;
    cursor += 1;
    input.setSelectionRange(cursor, cursor);
  } else {
    input.setSelectionRange(cursor, cursor);
    let text = [...input.value];
    text.splice(cursor, 0, "\n");
    text = text.join("");
    input.value = text;
    cursor += 1;
    input.setSelectionRange(cursor, cursor);
  }
};

const capsChange = () => {
  if (!capsLock.classList.contains("key_caps")) {
    capsLock.classList.add("key_caps");
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (row[i].children[j].textContent.length === 1) {
          row[i].children[j].innerHTML =
            row[i].children[j].innerHTML.toUpperCase();
        }
      }
    }
    checkCaps = true;
  } else {
    capsLock.classList.remove("key_caps");
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < row[i].children.length; j++) {
        if (row[i].children[j].textContent.length === 1) {
          row[i].children[j].innerHTML =
            row[i].children[j].innerHTML.toLowerCase();
        }
      }
    }
    checkCaps = false;
  }
};

const languageChange = () => {
  if (language === "en") {
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
    language = "ru";
    document.querySelector(".key_lang").textContent = "ru";
  } else {
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
    language = "en";
    document.querySelector(".key_lang").textContent = "en";
  }
  shiftButton = false;
};

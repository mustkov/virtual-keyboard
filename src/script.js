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

row.forEach((e) => {
  e.addEventListener("click", (event) => {
    input.focus();

    if (event.target.textContent.length === 1) {
      if (input.selectionStart === input.value.length) {
        cursor = input.value.length;
      }
      if (input.selectionStart !== input.selectionEnd) {
        let text = [...input.value];
        const currentTarget = event.target.textContent;
        text.splice(
          input.selectionStart,
          input.selectionEnd - input.selectionStart,
          currentTarget
        );
        text = text.join("");
        input.value = text;
        cursor += 1;
        input.setSelectionRange(cursor, cursor);
      } else {
        input.setSelectionRange(cursor, cursor);
        const text = [...input.value];
        text.splice(cursor, 0, event.target.textContent);
        input.value = text.join("");
        cursor += 1;
        input.setSelectionRange(cursor, cursor);
      }
      if (shiftButton === true) {
        shiftUp();
        shiftButton = false;
      }
    } else if (event.target.textContent === "CapsLock") {
      capsChange();
    } else if (event.target.textContent === "Tab") {
      tabChange();
    } else if (event.target.textContent === "Backspace") {
      backspaceChange();
    } else if (event.target.textContent === "Del") {
      deleteChange();
    } else if (event.target.textContent === "Enter") {
      enterChange();
    } else if (
      event.target.textContent === "en" ||
      event.target.textContent === "ru"
    ) {
      languageChange();
    } else if (event.target.textContent === "Shift") {
      if (shiftButton === false) {
        shiftDown();
        shiftButton = true;
      } else {
        shiftUp();
        shiftButton = false;
      }
    }
  });
});

document.addEventListener("keydown", (e) => {
  document.querySelector(`.${e.code}`).classList.add("key-active");
  if (e.altKey && e.shiftKey) {
    languageChange();
  }
  if (e.key === "Alt" || e.key === "AltGraph") {
    e.preventDefault();
  }
  if (e.key === "Shift") {
    e.preventDefault();
    shiftChange(e);
  } else if (e.key === "CapsLock") {
    e.preventDefault();
    capsChange();
  } else if (e.key === "Tab") {
    e.preventDefault();
    tabChange();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    backspaceChange();
  } else if (e.key === "Delete") {
    e.preventDefault();
    deleteChange();
  } else if (e.key === "Enter") {
    e.preventDefault();
    enterChange();
  } else if (e.key.length === 1) {
    e.preventDefault();
    input.focus();
    if (input.selectionStart !== input.selectionEnd) {
      let text = [...input.value];
      const cur = document.querySelector(`.${e.code}`).textContent;
      text.splice(
        input.selectionStart,
        input.selectionEnd - input.selectionStart,
        cur
      );
      text = text.join("");
      input.value = text;
      cursor += 1;
      input.setSelectionRange(cursor, cursor);
    } else {
      input.setSelectionRange(cursor, cursor);
      let text = [...input.value];
      const cur = document.querySelector(`.${e.code}`).textContent;
      text.splice(cursor, 0, cur);
      text = text.join("");
      input.value = text;
      cursor += 1;
      input.setSelectionRange(cursor, cursor);
    }
    if (shiftButton === true) {
      shiftUp();
      shiftButton = false;
    }
  }
});

document.addEventListener("keyup", (e) => {
  document.querySelector(`.${e.code}`).classList.remove("key-active");
  if (e.key === "Shift") {
    shiftChange(e);
  } else if (e.key.includes("Arrow")) {
    input.focus();
    cursor = input.selectionStart;
    input.setSelectionRange(cursor, cursor);
  }
});

input.addEventListener("click", () => {
  if (input.selectionStart !== input.selectionEnd) {
    input.setSelectionRange(input.selectionStart, input.selectionEnd);
    cursor = input.selectionStart;
  } else {
    cursor = input.selectionStart;
    input.setSelectionRange(cursor, cursor);
  }
});

const setLocalStorage = () => {
  localStorage.setItem("language", language);
  localStorage.setItem("checkCaps", checkCaps);
};
window.addEventListener("beforeunload", setLocalStorage);

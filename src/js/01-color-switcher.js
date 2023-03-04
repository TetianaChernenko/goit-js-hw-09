
const buttonStartEl = document.querySelector("[data-start]");
const buttonStopEl = document.querySelector("[data-stop]");
const bodyEl = document.querySelector("body");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
buttonStopEl.disabled = true;

buttonStartEl.addEventListener("click", onClickButtonStartEl);

function onClickButtonStartEl() {
    buttonStartEl.disabled = true;
    buttonStopEl.disabled = false;

    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();

    }, 1000);
}

buttonStopEl.addEventListener("click", onClickButtonStopEl);

function onClickButtonStopEl() {
    buttonStopEl.disabled = true;
    buttonStartEl.disabled = false;
    clearInterval(timerId);
}



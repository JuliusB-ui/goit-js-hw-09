import throttle from 'lodash.throttle';

const body = document.querySelector('body');
let startBtn = document.querySelector('[data-start]');
let stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let colorChangeInterval = null;
stopBtn.disabled = true;

function startColorChange() {
  colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

function stopColorChange() {
  clearInterval(colorChangeInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

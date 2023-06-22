const buttonStart = document.querySelector(`[data-start]`);
const buttonStop = document.querySelector(`[data-stop]`);
buttonStop.toggleAttribute("disabled");
buttonStart.addEventListener(`click`, colorStart);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let timer = null;
function colorStart() {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.toggleAttribute("disabled");
  buttonStop.toggleAttribute("disabled");
}
function colorStop() {
  clearInterval(timer);
  buttonStart.toggleAttribute("disabled");
  buttonStop.toggleAttribute("disabled");
}
buttonStop.addEventListener(`click`, colorStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timer = null

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', true);
    btnStop.removeAttribute('disabled');
    timer = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});
btnStop.addEventListener('click', () => {
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
    clearInterval(timer);
});



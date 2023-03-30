import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');
let timer = null;
let date = new Date();
let selectedTime;

btnStart.setAttribute('disabled', true);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= date.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      selectedTime = selectedDates[0];
      clearInterval(timer);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

function countingTime() {
  let date = new Date();
  if (selectedTime < date.getTime()) {
    clearInterval(timer);
    return;
  }
  else {
    const timerObj = convertMs(selectedTime - date.getTime());
    timerDays.innerHTML = addLeadingZero(timerObj.days);
    timerHours.innerHTML = addLeadingZero(timerObj.hours);
    timerMinutes.innerHTML = addLeadingZero(timerObj.minutes);
    timerSeconds.innerHTML = addLeadingZero(timerObj.seconds);
  }
}

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', true);
  timer = setInterval(countingTime, 1000);
});


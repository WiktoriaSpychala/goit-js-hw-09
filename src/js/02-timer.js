import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const input = document.querySelector('input');
const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data=minute]');
const timerSeconds = document.querySelector('.value[data-seconds]');
let timer = null;
let date = new Date();
let selectedTime;


btnStart.setAttribute('disabled', '');


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
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

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  countingTime();
  timer = setInterval(countingTime, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countingTime() {
  date = new Date();
  if (selectedTime < date.getTime()) {
    clearInterval(timer);
    return;
  } else {
    const { days, hours, minutes, seconds } = date;

    timerDays.textContent = addLeadingZero(days.toString());
    timerHours.textContent = addLeadingZero(hours.toString());
    timerMinutes.textContent = addLeadingZero(minutes.toString());
    timerSeconds.textContent = addLeadingZero(seconds.toString());
  }
}



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

console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}
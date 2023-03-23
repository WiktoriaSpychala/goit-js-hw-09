import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');
let timer = null;
let date = new Date().getTime();
let selectedTime;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= date) {
      window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');
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
};


const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

function countingTime() {
  const timerObj = convertMs(selectedTime - date);
  timerDays.innerHTML = addLeadingZero(timerObj.days);
  timerHours.innerHTML = addLeadingZero(timerObj.hours);
  timerMinutes.innerHTML = addLeadingZero(timerObj.minutes);
  timerSeconds.innerHTML = addLeadingZero(timerObj.seconds);
};
btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  timer = setInterval(countingTime(), 1000);
  
});


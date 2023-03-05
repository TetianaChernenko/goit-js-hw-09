import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;
buttonStartEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const date = new Date().getTime();
      if (selectedDate > date) {
        buttonStartEl.disabled = false;
      } else {
        Notify.failure("Please choose a date in the future");
      }
  },
};

flatpickr(inputEl, options);

buttonStartEl.addEventListener("click", onClickbuttonStart);

function onClickbuttonStart() {

    buttonStartEl.disabled = true;
    const inputDate = new Date(inputEl.value).getTime();

    timerId = setInterval(() => {
      const date = new Date().getTime();
      const ms = inputDate - date;
      if(ms >= 0) {
        const convertObject = convertMs(ms);
        daysEl.textContent = convertObject.days;
        hoursEl.textContent = convertObject.hours;
        minutesEl.textContent = convertObject.minutes;
        secondsEl.textContent = convertObject.seconds;
      } else {
          clearInterval(timerId);
      }
  
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
   if (value > 99) {
    return String(value).padStart(String(value).length, "0")
   }

    return String(value).padStart(2, "0");
  }

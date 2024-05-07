import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('input#datetime-picker'),
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startTime = Date.now();

    if (selectedDate < startTime) {
      Notify.failure('Please choose a date in the future.');
      console.log('why');
      refs.startButton.disabled = true;
      return;
    }

    refs.startButton.disabled = false;
    let intervalId = null;

    refs.startButton.addEventListener('click', startCountDown);

    function startCountDown() {
      refs.startButton.disabled = true;
      refs.datetimePicker.disabled = true;

      intervalId = setInterval(() => {
        const currentTime = Date.now();

        if (selectedDate < currentTime) {
          clearInterval(intervalId);
          refs.datetimePicker.disabled = false;
          return;
        }

        const timeDifference = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);
      });
    }
  },
};

flatpickr(refs.datetimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

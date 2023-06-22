import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
const timePicker = document.querySelector('#datetime-picker');
const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    startTimerBtn.disabled = selectedDates[0] < new Date();
    startTimerBtn.removeEventListener('click', changeTimerValue);
    startTimerBtn.addEventListener('click', () => {
      changeTimerValue(selectedDates[0]);
    });
  },
};

flatpickr(timePicker, options);

function changeTimerValue(selectedTime) {
  startTimerBtn.disabled = true;
  timePicker.disabled = true;
  const startTime = selectedTime;

  clearInterval(timerId);
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = currentTime - startTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    console.log(`days = ${days}`);
    timerValue.days.textContent = days;
    timerValue.hours.textContent = hours;
    timerValue.minutes.textContent = minutes;
    timerValue.seconds.textContent = seconds;
    console.log(deltaTime);

    if (deltaTime >= 0) {
      clearInterval(timerId);
      console.log('I worked');
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.abs(Math.floor(ms / day)));
  const hours = pad(Math.abs(Math.floor((ms % day) / hour)));
  const minutes = pad(Math.abs(Math.floor(((ms % day) % hour) / minute)));
  const seconds = pad(Math.abs(Math.floor((((ms % day) % hour) % minute) / second)));

  return { days, hours, minutes, seconds };
}

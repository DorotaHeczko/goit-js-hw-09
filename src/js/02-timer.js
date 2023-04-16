import flatpickr from "flatpickr";
import Notiflix from "notiflix";
import "flatpickr/dist/flatpickr.min.css";


//elem formularza w którym uytkownik wybiera datę i godzinę
const dateEl = document.getElementById("datetime-picker");

const startBtn = document.querySelector("[data-start]");

const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
let countdownIntervalId;

// funkcja do pobierania daty i sprawdzenia czy wybrana data jest z przyszłości
function startCountdown() {
  const letDate = new Date(dateEl.value).getTime();

  if (letDate < Date.now()) {
    alert("Please choose a date in the future");
    return;
  }

  startBtn.disabled = true;

  countdownIntervalId = setInterval(() => {
    const now = Date.now();
    const timeEl = letDate - now;

    if (timeEl < 0) {
      clearInterval(countdownIntervalId);
      startBtn.disabled = false;
      return;
    }

    const days = Math.floor(timeEl / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeEl % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeEl % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeEl % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }, 1000);
}

// kalendarz Flatpickr ustawiajacy date i godzinę 
flatpickr(dateEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      alert("Please choose a date in the future");
      datePicker.value = "";
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
});

startBtn.addEventListener("click", startCountdown);


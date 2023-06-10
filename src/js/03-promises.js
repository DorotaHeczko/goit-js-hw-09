import Notiflix from "notiflix";

const delayEl = document.querySelector("input[name=delay]");
const stepEl = document.querySelector("input[name=step]");
const amountEl = document.querySelector("input[name=amount]");
const submitEl = document.querySelector("button[type=submit]");



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}


async function myPromise(amount, step, time, current = 1) {
  if (current > amount) return;

  try {
    const success = await createPromise(current, time);
    Notiflix.Notify.success(success);
  } catch (error) {
    Notiflix.Notify.failure(error);
  }

  time += step;
  setTimeout(() => myPromise(amount, step, time, current + 1), step);
}



submitEl.addEventListener("click", function (event) {
  event.preventDefault();
  const { value: amount } = amountEl;
  const { value: step } = stepEl;
  const { value: delay } = delayEl;
  setTimeout(() => myPromise(+amount, +step, +delay), +delay);
});
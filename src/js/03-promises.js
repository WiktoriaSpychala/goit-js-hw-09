import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delays = document.querySelector('input[name="delay"]');
const steps = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay + steps.value * position)
  })
}

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < Number(amount.value); i++) {
    createPromise(i, Number(delays.value), Number(steps.value))
      .then(fulfill => { Notiflix.Notify.success(fulfill) })
      .catch(reject => { Notiflix.Notify.failure(reject) })
  }
}
form.addEventListener('submit', handleSubmit);
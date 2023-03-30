import Notiflix from 'notiflix';

const form = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const notifications = (position, delay) => {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};

const handleSubmit = event => {
  event.preventDefault();
  const delayValue = Number(form.elements.delay.value);
  const stepValue = Number(form.elements.step.value);
  const amountValue = Number(form.elements.amount.value)
  for (let i = 0; i < amountValue; i++) {
    promiseNumber = i + 1;
    delayPromise = delayValue + stepValue * i;
    notifications(promiseNumber, delayPromise);
  }
};

form.addEventListener('submit', handleSubmit);
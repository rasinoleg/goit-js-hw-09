const firstDeley = document.querySelector(`#dalay`);
const delayStep = document.querySelector(`#step`);
const inputAmount = document.querySelector(`#amount`);
const btnCreatePromises = document.querySelector(`#btnPromises`);
function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, 2000);
  });
}
const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);
function onSubmitForm(e) {
  e.preventDefault();
  let delay = Number(form.delay.value);
  for (let i = 1; i <= form.amount.value; i += 1) {
    createPromise(2, 1500)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        delay += Number(form.step.value);
      });
  }
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector(".form");
console.log(formEl);

formEl.addEventListener('submit',onSubmitForm);

function onSubmitForm(e) {
    e.preventDefault();
    const {
        elements: { delay, step, amount }
    } = e.currentTarget;

    for (let i = 0; i < Number(amount.value); i += 1) {
        createPromise(i + 1, Number(delay.value) + Number(step.value) * i).then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
            .catch(({ position, delay }) => {
                Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
    };
    
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({position, delay});
            }
        }, delay);
    });
}

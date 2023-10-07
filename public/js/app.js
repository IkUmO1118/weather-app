console.log('Client side javascript file is loaded!');

const form = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const address = input.value;

  msg1.textContent = '';
  msg2.textContent = '';

  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
});

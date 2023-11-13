import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');

  const saveFormState = throttle(() => {
    const currentState = {
      email: form.email.value,
      message: form.message.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
  }, 500);

  const loadFormState = () => {
    const storedState = localStorage.getItem('feedback-form-state');
    if (storedState) {
      const { email, message } = JSON.parse(storedState);
      form.email.value = email;
      form.message.value = message;
    }
  };

  form.addEventListener('input', saveFormState);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const storedState = localStorage.getItem('feedback-form-state');
    if (storedState) {
      const submitObject = JSON.parse(storedState);
      console.log(submitObject);
    }

    localStorage.removeItem('feedback-form-state');
    form.reset();
  });

  loadFormState();
});

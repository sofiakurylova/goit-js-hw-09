const feedbackForm = document.querySelector('.feedback-form');
const formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-state';

getStorageFormState();

feedbackForm.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    setStorageFormState();
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  if (checkFormIsEmpty()) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    resetStorageFormState();
  }
});

function getStorageFormState() {
  const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  Object.keys(formData).forEach(key => {
    if (storage[key]) {
      formData[key] = storage[key];
      feedbackForm.querySelector(`[name='${key}']`).value = storage[key];
    }
  });
}

function setStorageFormState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function resetStorageFormState() {
  feedbackForm.reset();
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(formData).forEach(key => (formData[key] = ''));
}

function checkFormIsEmpty() {
  return Object.values(formData).includes('');
}
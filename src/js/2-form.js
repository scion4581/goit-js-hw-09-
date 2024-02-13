'use strict';

const FEEDBACK_FORM_STORAGE_KEY = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');

function getFeedbackFormData(form) {
    return {
        email: form.email.value.trim(),
        message: form.message.value.trim()
    };
}

function setFeedbackFormData(form, formData) {
    form.email.value = formData.email;
    form.message.value = formData.message;
}

feedbackForm.addEventListener('input', event => {
    const formData = getFeedbackFormData(event.currentTarget);
    const jsonFormData = JSON.stringify(formData);
    localStorage.setItem(FEEDBACK_FORM_STORAGE_KEY, jsonFormData);
});

feedbackForm.addEventListener('submit', event => {
    event.preventDefault();
    const feedbackForm = event.currentTarget;
    const formData = getFeedbackFormData(feedbackForm);
    if (formData.email === '' || formData.message === '') {
        alert(`Поля Email та Message обов\`язкові для заповнення!`);
    } else {
        const feedbackFormData = getFeedbackFormData(feedbackForm);
        feedbackForm.reset();
        localStorage.removeItem(FEEDBACK_FORM_STORAGE_KEY);    
        console.log(feedbackFormData);
    }
});

const feedbackFormStorageData = localStorage.getItem(FEEDBACK_FORM_STORAGE_KEY);

if (feedbackFormStorageData) {
    setFeedbackFormData(feedbackForm, JSON.parse(feedbackFormStorageData));
}
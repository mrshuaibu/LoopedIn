'use strict';

const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('.form-group input[type="text"]');
const passwordInput = document.querySelector('.form-group input[type="password"]');
const errorMessage = document.querySelector('.login-form p'); 

localStorage.setItem('username', 'meet_michael');
localStorage.setItem('password', 'password123');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    errorMessage.textContent = '';
    errorMessage.classList.remove('visible');

    const inputUsername = usernameInput.value.trim();
    const inputPassword = passwordInput.value.trim();

    if (!inputUsername || !inputPassword) {
        errorMessage.textContent = 'Please fill in both fields.';
        errorMessage.classList.add('visible');
        return;
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (inputUsername === storedUsername && inputPassword === storedPassword) {
        window.location.href = 'home.html'; // This line of code helps me
        // redirect users to the home page when they login correctly
    } else {
        errorMessage.textContent = 'Incorrect username or password';
        errorMessage.classList.add('visible');
    }
});

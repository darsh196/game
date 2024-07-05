// login.js

function getUserData() {
    if (typeof(Storage) !== 'undefined') {
        var userData = localStorage.getItem('userData');
        return JSON.parse(userData) || [];
    } else {
        alert('Local storage is not supported by your browser.');
        return [];
    }
}

// Function to check if the provided username and password are correct
function validateLogin(username, password) {
    // Retrieve user data from local storage
    var userData = localStorage.getItem('userData');
    userData = JSON.parse(userData) || [];

    // Check if the login credentials are valid
    const isValidLogin = userData.some(user => user.username === username && user.password === password);

    return isValidLogin;
}

// Function to handle form submission
function handleLoginFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form elements
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');

    // Get the values from the form
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if the login is valid
    if (validateLogin(username, password)) {
        var userData = getUserData();
        userData.push({ username: username });
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Login successful! Redirecting to the home page.');
        // Replace 'index.html' with the actual URL you want to redirect to
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

// Attach the handleLoginFormSubmission function to the form's submit event
document.querySelector('form').addEventListener('submit', handleLoginFormSubmission);

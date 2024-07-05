// Function to retrieve user data from local storage
function getUserData() {
    if (typeof Storage !== 'undefined') {
        var userData = localStorage.getItem('userData');
        return JSON.parse(userData) || [];
    } else {
        alert('Local storage is not supported by your browser.');
        return [];
    }
}

// Function to update the welcome message with the username
function updateWelcomeMessage() {
    var userData = getUserData();
    var welcomeText = document.querySelector('.welcome-text');
    var userText = document.querySelector('.user-text');

    // Check if there is user data and a username
    if (userData.length > 0) {
        var lastUser = userData[userData.length - 1];
        if (lastUser.username) {
            var username = lastUser.username;
            welcomeText.innerHTML = 'Welcome';
            userText.innerHTML = ' ' + username + '!';
        }
    }
}

// Call the function when the page loads
window.onload = updateWelcomeMessage;


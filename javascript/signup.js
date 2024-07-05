function validateForm() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var location = document.getElementById('location').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // Using a simple regular expression to check the email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // Password validation
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
        alert('Password must be at least 6 characters long and include both letters and numbers.');
        return false;
    }

    saveUserData(username, email, password, location, phoneNumber);  

    return true;
}

function saveUserData(username, email, password, location, phoneNumber) {
    // Check if local storage is supported by the browser
    if (typeof(Storage) !== 'undefined') {
        // Retrieve existing user data from local storage or initialize an empty array
        var userData = JSON.parse(localStorage.getItem('userData')) || [];

        // Add new user data to the array
        userData.push({ username: username, email: email, password: password, location: location, phoneNumber: phoneNumber });

        // Save the updated array back to local storage
        localStorage.setItem('userData', JSON.stringify(userData));
    } else {
        alert('Local storage is not supported by your browser. User data cannot be saved.');
    }
}
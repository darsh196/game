document.addEventListener("DOMContentLoaded", function () {
    // Select the table element in the rankings page
    const rankingsTable = document.querySelector('.rankings table');

    // Retrieve the user's score from local storage
    const userScore = localStorage.getItem('highestScore');

    // Update the first row in the table with the user's score
    if (userScore) {
        const firstRow = rankingsTable.rows[1]; // Assuming the user's score should be displayed in the second row
        firstRow.cells[1].textContent = userScore;
    }
});

function getUserData() {
	    if (typeof(Storage) !== 'undefined') {
	        var userData = localStorage.getItem('userData');
	        return JSON.parse(userData) || [];
	    } else {
	        alert('Local storage is not supported by your browser.');
	        return [];
	    }
	}

function updateUsername() {
    var userData = getUserData();
    var userText = document.querySelector('.username1');

    // Check if there is user data and a username
    if (userData.length > 0 && userData[userData.length - 1].username) {
        var username = userData[userData.length - 1].username;
        userText.textContent = username;

        // Create a new row for the new user
        var newRow = rankingsTable.insertRow(-1); // -1 appends the row at the end
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        cell1.textContent = username;
        cell2.textContent = "-";
    }
}

window.onload = updateUsername;
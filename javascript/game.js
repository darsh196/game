document.addEventListener("DOMContentLoaded", function () {
    var player = document.querySelector(".player");
    var imagesContainer = document.querySelector(".images-container");
    var timerElement = document.getElementById('timer');
    var scoreElement = document.getElementById('score');
    const missile = document.querySelector(".missile");
    const missile2 = document.querySelector(".missile2"); // Select the second missile
    const missile3 = document.querySelector(".missile3"); 
    const su57 = document.querySelector(".su57"); 
    let score = 0; // Initialize the score
    let isGameFrozen = false;

    // Retrieve the highest score from local storage
    const highestScore = localStorage.getItem('highestScore');

    // If the highest score is not set, initialize it to 0
    if (highestScore === null) {
        localStorage.setItem('highestScore', 0);
    }


    var playerPositionY = 400;
    let missilePositionX = window.innerWidth;;
    let missilePositionY = Math.floor(Math.random() * window.innerHeight);
    let missile2PositionX = window.innerWidth; // Initial position from the right edge
    let missile2PositionY = Math.floor(Math.random() * window.innerHeight); // Random initial Y-position
    let missile3PositionX = window.innerWidth; // Initial position from the right edge
    let missile3PositionY = Math.floor(Math.random() * window.innerHeight); // Random initial Y-position
    let su57PositionX = window.innerWidth; // Initial position from the right edge
    let su57PositionY = Math.floor(Math.random() * window.innerHeight);  

    missile2.style.top = missile2PositionY + "px";

    function movePlayerUp() {
        if (playerPositionY > 0) {
            playerPositionY -= 10;
            player.style.top = playerPositionY + "px";
        }
    }

    function movePlayerDown() {
        if (playerPositionY < window.innerHeight - player.offsetHeight) {
            playerPositionY += 10;
            player.style.top = playerPositionY + "px";
        }
    }

    // Initial position of the player
    player.style.top = playerPositionY + "px";

    function moveMissiles() {
        if (isGameFrozen) {
            return; // Don't move missiles if the game is frozen
        }
        missilePositionX -= 30; // Adjust the speed as needed
        missile.style.left = missilePositionX + "px";

        // Check if the missile is out of the screen
        if (missilePositionX < -missile.offsetWidth) {
            // Reset missile position when it goes out of the screen
            missilePositionX = window.innerWidth;
            missile.style.left = missilePositionX + "px";

            // Randomize the Y-position of missile2
            missilePositionY = Math.floor(Math.random() * window.innerHeight);
            missile.style.top = missilePositionY + "px";
        }

        // Check for collisions
        checkCollision(missile, missilePositionX);

        // Move the second missile from right to left
        missile2PositionX -= 30; // Adjust the speed as needed
        missile2.style.left = missile2PositionX + "px";

        // Check if the missile is out of the screen
        if (missile2PositionX < -missile2.offsetWidth) {
            // Reset missile position when it goes out of the screen
            missile2PositionX = window.innerWidth;
            missile2.style.left = missile2PositionX + "px";

            // Randomize the Y-position of missile2
            missile2PositionY = Math.floor(Math.random() * window.innerHeight);
            missile2.style.top = missile2PositionY + "px";
        }

        // Check for collisions with the second missile
        checkCollision(missile2, missile2PositionX);

        missile3PositionX -= 30; // Adjust the speed as needed
        missile3.style.left = missile2PositionX + "px";


        if (missile3PositionX < -missile3.offsetWidth) {
            // Reset missile position when it goes out of the screen
            missile3PositionX = window.innerWidth;
            missile3.style.left = missile3PositionX + "px";

            // Randomize the Y-position of missile2
            missile3PositionY = Math.floor(Math.random() * window.innerHeight);
            missile3.style.top = missile3PositionY + "px";
        }

        // Check for collisions with the second missile
        checkCollision(missile3, missile3PositionX);
    }

    function createExplosion(x, y) {
      const explosion = document.createElement('div');
      explosion.classList.add('explosion');
      explosion.style.left = x + 'px';
      explosion.style.top = y + 'px';
      document.body.appendChild(explosion);

      // Remove the explosion element after the animation completes
      explosion.addEventListener('animationend', () => {
        document.body.removeChild(explosion);
      });
    }



    function checkCollision(missileElement, positionX) {
        // Check for collisions
        if (
            positionX < player.offsetLeft + player.offsetWidth &&
            positionX + missileElement.offsetWidth > player.offsetLeft &&
            missileElement.offsetTop < player.offsetTop + player.offsetHeight &&
            missileElement.offsetTop + missileElement.offsetHeight > player.offsetTop
        ) {
            // Collision detected, display GAME OVER window
            showGameOver();

            // Create an explosion effect at the player's position
            createExplosion(player.offsetLeft, player.offsetTop);
        }
    }

    function updateScore() {
        scoreElement.textContent = `SCORE: ${score + 1}`;
        score++;
    }

    function checkCollision2(su57, positionX) {
        // Check for collisions with su57
        if (
            positionX < player.offsetLeft + player.offsetWidth &&
            positionX + su57.offsetWidth > player.offsetLeft &&
            su57.offsetTop < player.offsetTop + player.offsetHeight &&
            su57.offsetTop + su57.offsetHeight > player.offsetTop
        ) {
            // Collision detected with su57, update score 
            updateScore();
        }
    }

    function movesu57(){
        if (isGameFrozen) {
            return; // Don't move missiles if the game is frozen
        }
        su57PositionX -= 20; // Adjust the speed as needed
        su57.style.left = su57PositionX + "px";
        
        // Check if the missile is out of the screen
        if (su57PositionX < -su57.offsetWidth) {
            // Reset missile position when it goes out of the screen
            su57PositionX = window.innerWidth;
            su57.style.left = su57PositionX + "px";

            // Randomize the Y-position of missile2
            su57PositionY = Math.floor(Math.random() * window.innerHeight);
            su57.style.top = su57PositionY + "px";
        }
        checkCollision2(su57, su57PositionX)

    }

    setInterval(moveMissiles, 50);
    setInterval(movesu57, 50);

    // Event listener for keydown events
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp") {
            movePlayerUp();
        } else if (event.key === "ArrowDown") {
            movePlayerDown();
        } 
    });

    // Set the initial time (in seconds)
    let timeRemaining = 60;

    // Function to update the timer
    function updateTimer() {
        // Update the timer display
        timerElement.textContent = `TIMER: ${timeRemaining}`;

        // Check if the time has reached 0
        if (timeRemaining === 0) {
            // Display the game over window
            showGameOver();
        } else {
            // Decrement the time remaining
            timeRemaining--;

            // Call the updateTimer function after 1 second
            setTimeout(updateTimer, 1000);
        }
    }

    function updateScoreAndRankings(score) {
        // Retrieve the highest score from local storage
        const highestScore = parseInt(localStorage.getItem('highestScore'));

        // Check if the current score is higher than the stored highest score
        if (score > highestScore || isNaN(highestScore)) {
            // Update the highest score in local storage
            localStorage.setItem('highestScore', score);
        }

        localStorage.setItem('userScore', score);

        setTimeout(function () {
            window.location.href = 'leaderboard.html';
        }, 5000);
    }
    // Function to show the game over window
    function showGameOver() {
        isGameFrozen = true;

        // Display the game over window
        const gameOverWindow = document.getElementById('game-over-window');
        gameOverWindow.style.display = 'block';

        const finalScoreElement = document.getElementById('final-score');
        finalScoreElement.textContent = `${score}`;

        const redirectMessage = document.getElementById('redirect-message');
        redirectMessage.textContent = 'Redirecting in 5 seconds...';

        // Update the user's score and transfer to the Leaderboard page
        updateScoreAndRankings(score);
    }

    // Start the timer when the page loads
    updateTimer();

});




var attackOne = document.querySelector(".attack1");
var attackTwo = document.querySelector(".attack2");
var attackThree = document.querySelector(".attack3");
var attackFour = document.querySelector(".attack4");
var playerTwoHealthBar = document.querySelector(".p2-health");
var playerTwoHealthCount = document.querySelector(".health-count-p2");
var playerOneHealthBar = document.querySelector(".p1-health");
var playerOneHealthCount = document.querySelector(".health-count-p1");
var gameStateText = document.querySelector(".game-state");
var attackContainer = document.querySelector(".attack-container");
var restartBtn = document.querySelector(".restart-game");
var playerOneHealth = 70;
var playerTwoHealth = 70;
var playerTwoAttacks = [
    "Psychic",
    "Confusion",
    "Facade",
    "Psycho Blast",
];
// Changes health color for player one and player two
var healthColor = function (playerHealth, playerBar) {
    if (playerHealth < 40 && playerHealth > 20) {
        playerBar.style.backgroundColor = "#cee809";
    }
    else if (playerHealth < 20) {
        playerBar.style.backgroundColor = "red";
    }
    else {
        playerBar.style.backgroundColor = "green";
    }
};
// Checks if Charmander or Mewtwo win
var checkWinner = function (name, playerBar, playerCount) {
    gameStateText.innerText = "".concat(name, " wins! Press restart to play again!");
    playerBar.style.width = "0%";
    gameStateText.style.display = "block";
    attackContainer.style.display = "none";
    playerCount.innerText = "0 / 70";
    restartBtn.style.display = "block";
};
// Player One Attacking logic function
var playerOneAttack = function (subtract, missCount, attackName) {
    // Gets random number to calculate if it's a miss
    var randomNumber = Math.floor(Math.random() * missCount) + 1;
    if (randomNumber !== 1) {
        // Subtract health
        playerTwoHealth -= subtract;
        if (playerTwoHealth <= 0) {
            checkWinner("Charmander", playerTwoHealthBar, playerTwoHealthCount);
        }
        else if (playerOneHealth <= 0) {
            checkWinner("Mewtwo", playerOneHealthBar, playerOneHealthCount);
        }
        else {
            intervalFunction();
            playerTwoHealthBar.style.width = "".concat(playerTwoHealth, "%");
            playerTwoHealthBar.style.transition = "1.4s";
            playerTwoHealthCount.innerText = "".concat(playerTwoHealth, " / 70");
            gameStateText.innerText = "Charmander used ".concat(attackName, "! It took away ").concat(subtract, " HP!");
            attackContainer.style.display = "none";
        }
        // Miss game state text
    }
    else {
        gameStateText.innerText = "Charmander used ".concat(attackName, "... But it missed!");
        intervalFunction();
    }
};
var playerTwoAttack = function () {
    var missCount;
    var subtractHealth;
    var randomAttackNum = Math.floor(Math.random() * 4) + 0;
    var randomAttack = playerTwoAttacks[randomAttackNum];
    if (randomAttack === "Psychic") {
        missCount = 10;
        subtractHealth = 15;
    }
    else if (randomAttack === "Confusion") {
        missCount = 7;
        subtractHealth = 17;
    }
    else if (randomAttack === "Facade") {
        missCount = 4;
        subtractHealth = 20;
    }
    else {
        missCount = 2;
        subtractHealth = 32;
    }
    var randomNumber = Math.floor(Math.random() * missCount) + 1;
    if (randomNumber !== 1) {
        playerOneHealth -= subtractHealth;
        if (playerOneHealth <= 0) {
            checkWinner("Mewtwo", playerOneHealthBar, playerOneHealthCount);
        }
        else {
            playerOneHealthBar.style.width = "".concat(playerOneHealth, "%");
            playerOneHealthBar.style.transition = "1.4s";
            playerOneHealthCount.innerText = "".concat(playerOneHealth, " / 70");
            gameStateText.innerText = "Mewtwo used ".concat(randomAttack, "! It took away ").concat(subtractHealth, " HP!");
            attackContainer.style.display = "none";
        }
    }
    else {
        gameStateText.innerText = "Mewtwo used ".concat(randomAttack, "... But it missed!");
    }
};
setInterval(function () {
    healthColor(playerOneHealth, playerOneHealthBar);
}, 500);
// Setting interval for the game state auto reading text
var intervalFunction = function () {
    healthColor(playerTwoHealth, playerTwoHealthBar);
    var interval = setInterval(function () {
        gameStateText.style.display = "block";
        attackContainer.style.display = "none";
    }, 1);
    var intervalTwo = setInterval(function () {
        playerTwoAttack();
        clearInterval(intervalTwo);
    }, 2502);
    setTimeout(function () {
        clearInterval(interval);
        if (playerOneHealth >= 0) {
            gameStateText.style.display = "none";
            attackContainer.style.display = "grid";
        }
    }, 5004);
};
// Restart game logic
var restartGame = function () {
    playerTwoHealthBar.style.width = "70%";
    gameStateText.style.display = "none";
    attackContainer.style.display = "grid";
    playerTwoHealthCount.innerText = "70 / 70";
    playerOneHealthBar.style.width = "70%";
    playerOneHealthBar.style.backgroundColor = "green";
    playerTwoHealthBar.style.backgroundColor = "green";
    playerOneHealthCount.innerText = "70 / 70";
    restartBtn.style.display = "none";
    playerOneHealth = 70;
    playerTwoHealth = 70;
};
// Restart button event listener
restartBtn.addEventListener("click", function () { return restartGame(); });
// Player one attack button events
attackOne.addEventListener("click", function () { return playerOneAttack(12, 18, "Body Slam"); });
attackTwo.addEventListener("click", function () {
    return playerOneAttack(20, 8, "Fire Breath");
});
attackThree.addEventListener("click", function () {
    return playerOneAttack(24, 4, "Annihilate");
});
attackFour.addEventListener("click", function () {
    return playerOneAttack(29, 2, "Flamethrower");
});

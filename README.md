# POKEMON BATTLE CLONE (Typescript)
<img width="1440" alt="Screen Shot 2022-06-30 at 11 47 16 AM" src="https://user-images.githubusercontent.com/91504668/176720656-f630c67b-1f30-4e19-af7d-b13657fd6a3d.png">
Live Site: https://zakschenck.github.io/pokemon-game-typescript/

## Project Description
Completely inspired by pokemon battle systems. You can attack, with each attack having different damage and miss properties. After attacking, the computer will use a random attack with different properties from the player's attacks. Character wins when the health bar reaches zero. This project has some heavy DOM manipulation and fairly complex logic.<img width="1440" alt="Screen Shot 2022-06-30 at 11 47 03 AM" src="https://user-images.githubusercontent.com/91504668/176720589-b98b65ed-a39a-4ce5-8b6a-96735f6428c2.png">

## Project Hurtles
The biggest issue for me was working with ``setInterval``, ``clearInterval``, and ``setTimeout``. This was for the auto reading text when the player attacks, along with the computer following. Combining the interval attack logic with the logic behind whether a character wins or not was a bit tricky. Here's my code for this section.

```js
setInterval((): void => {
  healthColor(playerOneHealth, playerOneHealthBar);
}, 500);
// Setting interval for the game state auto reading text
const intervalFunction = () => {
  healthColor(playerTwoHealth, playerTwoHealthBar);
  const interval = setInterval(() => {
    gameStateText.style.display = "block";
    attackContainer.style.display = "none";
  }, 1);
  const intervalTwo = setInterval(() => {
    playerTwoAttack();
    clearInterval(intervalTwo);
  }, 2502);
  setTimeout(() => {
    clearInterval(interval);
    if (playerOneHealth >= 0) {
      gameStateText.style.display = "none";
      attackContainer.style.display = "grid";
    }
  }, 5004);
};
```

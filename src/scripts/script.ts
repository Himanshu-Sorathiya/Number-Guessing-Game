/**
 * The input field where the user types their guess.
 * @type {HTMLInputElement}
 */
const inputField = document.querySelector(".input-field")! as HTMLInputElement;

/**
 * The span element that displays the remaining number of guesses.
 * @type {HTMLSpanElement}
 */
const wrongGuessCounter = document.querySelector(
  ".chances-left",
)! as HTMLSpanElement;

/**
 * The paragraph element for displaying game messages (e.g., "Congratulations", "Your guess is high").
 * @type {HTMLParagraphElement}
 */
const guessResult = document.querySelector(
  ".guess-result",
)! as HTMLParagraphElement;

/**
 * The button to check the user's guess.
 * @type {HTMLButtonElement}
 */
const checkBtn = document.querySelector(".check-btn")! as HTMLButtonElement;

/**
 * The button to restart the game.
 * @type {HTMLButtonElement}
 */
const replayBtn = document.querySelector(".replay-btn")! as HTMLButtonElement;

/**
 * The randomly generated number that the user is trying to guess.
 * @type {number}
 */
let randomNumber: number;

/**
 * The number of remaining guesses for the user.
 * @type {number}
 */
let wrongGuess: number;

/**
 * Clears the input field and sets focus on it.
 * @function
 */
function clearInputFieldAndFocus(): void {
  inputField.value = "";
  inputField.focus();
}

/**
 * Initializes the game by setting up the random number, resetting the guess counter,
 * and updating the display elements. Focuses the input field when initializing.
 * @function
 */
function initialization(): void {
  wrongGuess = 10;
  wrongGuessCounter.textContent = String(wrongGuess);

  randomNumber = Math.trunc(Math.random() * 100 + 1);

  guessResult.classList.add("hidden");

  checkBtn.disabled = false;
  checkBtn.classList.remove("hidden");

  replayBtn.disabled = true;
  replayBtn.classList.add("hidden");

  inputField.disabled = false;
  clearInputFieldAndFocus();
}

/**
 * Displays a message to the user regarding the result of their guess (e.g., "Congratulations", "Your guess is high").
 * @param {string} msg - The message to display.
 * @function
 */
function guessResultMessage(msg: string): void {
  guessResult.classList.remove("hidden");
  guessResult.textContent = msg;
}

/**
 * Ends the game by disabling the input field and buttons, and showing the replay button.
 * @function
 */
function gameOver(): void {
  inputField.disabled = true;
  inputField.blur();

  checkBtn.disabled = true;
  checkBtn.classList.add("hidden");

  replayBtn.disabled = false;
  replayBtn.classList.remove("hidden");
}

/**
 * Handles the click event on the check button by comparing the user's guess with the generated number,
 * updating the number of remaining guesses, and providing feedback.
 * @function
 */
checkBtn.addEventListener("click", function () {
  const guess = inputField.value;

  if (/^[0-9]+$/.test(guess)) {
    if (+guess > 100) {
      guessResultMessage("Please enter a number in the given range");

      clearInputFieldAndFocus();
      return;
    }

    if (+guess === randomNumber) {
      guessResultMessage("Congratulations");

      gameOver();
    } else {
      wrongGuess--;
      wrongGuessCounter.textContent = String(wrongGuess);

      if (wrongGuess === 0) {
        guessResultMessage("You lost the game");

        gameOver();
      } else {
        guessResultMessage(
          +guess > randomNumber ? "Your guess is high" : "Your guess is low",
        );

        inputField.focus();
      }
    }
  } else {
    clearInputFieldAndFocus();
  }
});

/**
 * Adds an event listener to the replay button to restart the game when clicked.
 * @function
 */
replayBtn.addEventListener("click", initialization);

/**
 * Initializes the game when the DOM content is fully loaded.
 * @function
 */
window.addEventListener("DOMContentLoaded", initialization);

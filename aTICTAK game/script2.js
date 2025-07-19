const buttons = document.querySelectorAll("td button");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset-btn");

let turnO = true; // true = O's turn, false = X's turn
let gameOver = false;

// All 8 win patterns (row, col, diagonal)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle each button click
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "" && !gameOver) {
      btn.textContent = turnO ? "O" : "X";
      checkWinner();
      turnO = !turnO;
    }
  });
});

// Check if there's a winner or draw
function checkWinner() {
  const values = Array.from(buttons).map(btn => btn.textContent);

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      values[a] &&
      values[a] === values[b] &&
      values[b] === values[c]
    ) {
      result.textContent = `${values[a]} wins!`;
      gameOver = true;
      disableAll();
      return;
    }
  }

  // Check for draw
  if (values.every(val => val !== "")) {
    result.textContent = "It's a Draw!";
    gameOver = true;
  }
}

// Disable all buttons after win
function disableAll() {
  buttons.forEach(btn => btn.disabled = true);
}

// Reset game
resetBtn.addEventListener("click", () => {
  buttons.forEach(btn => {
    btn.textContent = "";
    btn.disabled = false;
  });
  result.textContent = "RESULT";
  turnO = true;
  gameOver = false;
});



console.log("Game Starts!")
let buttons = document.querySelectorAll("td button");
let resetBtn = document.querySelector(".reset-btn");
let result = document.querySelector(".result");

let turnO = true;
//winning patter indecs combinations
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]           // diagonals
];
let cnt = 0;
//play game
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.textContent === "") {
            if (turnO) {
                btn.textContent = "O";
            } else {
                btn.textContent = "X";
            }
            turnO = !turnO; // switch turn
            cnt=cnt+1;
        }
        // checkWinner
        for (let pattern of winPatterns) {
            //initialise indices
            let a = pattern[0];
            let b = pattern[1];
            let c = pattern[2];

            // check if those indices are equal or not
            if (buttons[a].textContent !== "" &&
                buttons[a].textContent === buttons[b].textContent &&
                buttons[b].textContent === buttons[c].textContent)// someone won
            //print result and clearn all boxes
            {
                result.textContent = `${buttons[a].textContent} wins`;
                disableAll();
            }
        }
        if (cnt == 9) {
            result.textContent = "DRAW";

        }
    });
});


resetBtn.addEventListener("click", () => {
    console.log("reset clicked");
    buttons.forEach((btn) => {
        btn.textContent = "";
    });
    result.textContent = "";
});

// Disable all buttons after win
function disableAll() {
  buttons.forEach(btn => btn.disabled = true);
}


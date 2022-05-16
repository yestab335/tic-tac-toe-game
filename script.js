let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'X' Plays First
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    // Enable Popup
    popupRef.classList.remove("hide");
};

// Enable All BUttons (For New Game And Restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });

    // Disable Popup
    popupRef.classList.add("hide");
};

// This Function Is Executed When A Player Wins
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins"
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins"
    }
};

// Fuction For Draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Win Logic
const winChecker = () => {
    // Loop Through All Win Patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerHTML,
            btnRef[i[1]].innerHTML,
            btnRef[i[2]].innerHTML,
        ];

        // Check If Elements Are Filled
        // If 3 Empty Elements Are Same And Would Give Win As Would
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                // If All 3 Buttons Have Same Values Then Pass The Value To winFunction
                winFunction(element1);
            }
        }
    }
};

// Display X/O On Click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            // Display X
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            // Display Y
            element.innerText = "O";
            element.disabled = true;
        }

        // Increment Count On Each Click
        count += 1;
        if (count == 9) {
            drawFunction();
        }

        // CHeck For Win On Ever Click
        winChecker();
    });
});

// Enable Buttons And Disable Popup On Page Load
window.onload = enableButtons;
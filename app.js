let userScore = 0;
let compScore = 0;
let round = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const roundPara = document.querySelector("#round");

const compChoicePara = document.querySelector("#comp-choice");

const resetBtn = document.querySelector("#reset");

/* Generate Computer Choice */

const genCompChoice = () => {

    const options = ["rock", "paper", "scissors"];

    const randIdx = Math.floor(Math.random() * 3);

    return options[randIdx];
};

/* Draw Game */

const drawGame = () => {

    msg.innerText = "It's a draw! Play again.";

    msg.style.backgroundColor = "black";
};

/* Disable Game */

const disableGame = () => {

    choices.forEach((choice) => {

        choice.classList.add("disabled");
    });
};

/* Enable Game */

const enableGame = () => {

    choices.forEach((choice) => {

        choice.classList.remove("disabled");
    });
};

/* Show Winner */

const showWinner = (userWin, userChoice, compChoice) => {

    if(userWin){

        userScore++;

        userScorePara.innerText = userScore;

        msg.innerText =
        `You win! ${userChoice} beats ${compChoice}`;

        msg.style.backgroundColor = "green";

    } else {

        compScore++;

        compScorePara.innerText = compScore;

        msg.innerText =
        `You lost! ${compChoice} beats ${userChoice}`;

        msg.style.backgroundColor = "red";
    }

    /* Update Round */

    round++;

    roundPara.innerText = `Round: ${round}`;

    /* Match Winner */

    if(userScore === 5){

        msg.innerText = "🎉 You won the match!";

        msg.style.backgroundColor = "green";

        disableGame();
    }

    if(compScore === 5){

        msg.innerText = "😢 Computer won the match!";

        msg.style.backgroundColor = "red";

        disableGame();
    }
};

/* Play Game */

const playGame = (userChoice) => {

    if(userScore === 5 || compScore === 5){
        return;
    }

    const compChoice = genCompChoice();

    compChoicePara.innerText =
    `Computer chose ${compChoice}`;

    if(userChoice === compChoice){

        drawGame();

    } else {

        const winMap = {
            rock: "scissors",
            paper: "rock",
            scissors: "paper",
        };

        const userWin =
        winMap[userChoice] === compChoice;

        showWinner(userWin, userChoice, compChoice);
    }
};

/* User Click */

choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userChoice =
        choice.getAttribute("id");

        playGame(userChoice);
    });
});

/* Reset Game */

resetBtn.addEventListener("click", () => {

    userScore = 0;

    compScore = 0;

    round = 0;

    userScorePara.innerText = 0;

    compScorePara.innerText = 0;

    roundPara.innerText = "Round: 0";

    compChoicePara.innerText = "";

    msg.innerText = "Play your move";

    msg.style.backgroundColor = "black";

    enableGame();
});
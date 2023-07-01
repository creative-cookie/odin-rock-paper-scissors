// Declare variables to store game info
let playerChoice;
let computerChoice;
let playerScore;
let computerScore;
let feedbackText;
let gameCount = 0;

//Get elements from DOM and store in variables
const playerScoreContainer = document.getElementById("player-score-container");
const computerScoreContainer = document.getElementById("computer-score-container");
const playerChoiceContainer = document.getElementById("player-choice-container");
const computerChoiceContainer = document.getElementById("computer-choice-container");
const playerChoiceIcon = document.getElementById("player-choice-icon");
const computerChoiceIcon = document.getElementById("computer-choice-icon");
const playerChoiceLabel = document.getElementById("player-choice-label");
const computerChoiceLabel = document.getElementById("computer-choice-label");
const feedbackContainer = document.getElementById("feedback-container");
const gameBoardContainer = document.getElementById("gameboard-container");
const resultsContainer = document.getElementById("results-container");
const playerChoiceButtons = document.querySelectorAll("[data-choice]");


function newGame(){
	playerScore = 0;
    computerScore = 0;
    playerScoreContainer.innerText = playerScore;
    computerScoreContainer.innerText = computerScore;

    //actionButton.removeEventListener("click", newGame);

    enableChoiceBtns();

	if (gameCount > 0){
        toggleHidden(gameboardContainer);
        toggleHidden(resultsContainer);
    }

	gameCount++;
}

function enableChoiceBtns(){
    for(const button of playerChoiceButtons){
        button.addEventListener("click", setChoices);
    }
}

function disableChoiceBtns(){
    for(const button of playerChoiceButtons){
        button.removeEventListener("click", setChoices);
    }
}

newGame();


function generateComputerChoice(){
    let randomNum = Math.floor(Math.random() * 3) + 1;

    if(randomNum === 1){
        return "Rock";
    } else if(randomNum === 2){
        return "Paper";
    } else{
        return "Scissors";
    }

}

function setChoices(e){
    disableChoiceBtns();
    playerChoice = e.currentTarget.dataset.choice;
    computerChoice = generateComputerChoice();

    console.log("Player: " + playerChoice);
    console.log("Computer: " + computerChoice);

    playRound(playerChoice, computerChoice);
}

function playRound(playerSelection, computerSelection){
    if(computerSelection === playerSelection){
        feedbackContainer.innerText = 'It was a tie';
    } else if(computerSelection === 'rock' && playerSelection === 'paper'){
        feedbackContainer.innerText = 'Paper beats Rock. You win!';
        playerScore++;
    } else if(computerSelection === 'paper' && playerSelection === 'scissors'){
        feedbackContainer.innerText = 'Scissors beats Paper. You win!';
        playerScore++;
    } else if(computerSelection === 'scissors' && playerSelection === 'rock'){
        feedbackContainer.innerText = 'Rock beats Scissors. You win!';
        playerScore++;
    } else{
        feedbackContainer.innerText = `${computerSelection} beats ${playerSelection}. You lose!`
        computerScore++;
    }

    formatResults();
}

function formatResults(){
    setBorderColor(playerChoice, playerChoiceContainer);
    setBorderColor(computerChoice, computerChoiceContainer);

    setIcon(playerChoice, playerChoiceIcon);
    setIcon(computerChoice, computerChoiceIcon);

// 	EXECUTE setChoiceLabel(playerChoice, playerChoiceLabel)
// 	EXECUTE setChoiceLabel(computerChoice, computerChoiceLabel)

// 	EXECUTE setFeedback(feedbackText, feedbackContainer)

// 	IF playerScore == 5 OR computerScore == 5
// 		SET actionButton text to ‘New Game’
// 		ADD EVENT LISTENER to trigger FUNCTION newGame
// 	ELSE
// 		SET actionButton text to ‘Next Round’
// 		ADD EVENT LISTENER to trigger FUNCTION nextRound

// 	EXECUTE displayResults
}

function setBorderColor(choice, container){
    if (choice === 'Rock'){
        container.classList.add("border-rock");
        container.classList.remove("border-paper");
        container.classList.remove("border-scissors");
    } else if(choice ==='Paper'){
        container.classList.remove("border-rock");
        container.classList.add("border-paper");
        container.classList.remove("border-scissors");
    } else {
        container.classList.remove("border-rock");
        container.classList.remove("border-paper");
        container.classList.add("border-scissors");
    }
}

function setIcon(choice, icon){
    if (choice === 'Rock'){
        icon.src = "images/hand-back-fist-regular.svg";
    } else if(choice ==='Paper'){
        icon.src = "images/hand-regular.svg";
    } else {
        icon.src = "images/hand-scissors-regular.svg";
    }
}

// function game(){
//     for(let i = 0; i < 5; i++){
//         computerSelection = getComputerChoice();
//         playerSelection = getUserChoice();

//         if(playerSelection !== 'no response'){
//             console.log(playRound(computerSelection, playerSelection));
//         } else {
//             console.log('User declined to play');
//             break;
//         }
//     }
//     console.log('The game has ended');
// }

// game();


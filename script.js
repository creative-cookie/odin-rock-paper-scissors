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
const gameboardContainer = document.getElementById("gameboard-container");
const resultsContainer = document.getElementById("results-container");
const playerChoiceButtons = document.querySelectorAll("[data-choice]");
const actionButton = document.getElementById("action-btn");


function newGame(){
	playerScore = 0;
    computerScore = 0;
    playerScoreContainer.innerText = playerScore;
    computerScoreContainer.innerText = computerScore;

    actionButton.removeEventListener("click", newGame);

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
    } else if(computerSelection === 'Rock' && playerSelection === 'Paper'){
        feedbackContainer.innerText = 'Paper beats Rock. You win!';
        playerScore++;
    } else if(computerSelection === 'Paper' && playerSelection === 'Scissors'){
        feedbackContainer.innerText = 'Scissors beats Paper. You win!';
        playerScore++;
    } else if(computerSelection === 'Scissors' && playerSelection === 'Rock'){
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

    setChoiceLabel(playerChoice, playerChoiceLabel);
    setChoiceLabel(computerChoice, computerChoiceLabel);

    setActionButton();

    displayResults();
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

function setChoiceLabel(choice, label){
        label.innerText = choice;
}

function setActionButton(){
    if(playerScore === 5 || computerScore === 5){
        actionButton.innerText = "New Game";
        actionButton.addEventListener("click", newGame);
    } else {
        actionButton.innerText = "Next Round";
        actionButton.addEventListener("click", nextRound);
    }
}

function displayResults(){
    toggleHidden(gameboardContainer);
 	toggleHidden(resultsContainer);

    updateScore();
}

function toggleHidden(container){
    container.classList.toggle("hidden");
}

function updateScore(){
    playerScoreContainer.innerText = playerScore;
    computerScoreContainer.innerText = computerScore;
}

function nextRound(){
    enableChoiceBtns();
    actionButton.removeEventListener("click", nextRound);

    toggleHidden(gameboardContainer);
    toggleHidden(resultsContainer);
}

newGame();


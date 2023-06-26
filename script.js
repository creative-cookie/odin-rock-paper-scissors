// Declare variables to store game info
let playerChoice;
let computerChoice;
let playerScore;
let computerScore;
let feedbackText;
let gameCount;

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

function getComputerChoice(){
    let randomNum = Math.floor(Math.random() * 3) + 1;
    let computerChoice;

    if(randomNum === 1){
        computerChoice = "rock";
    } else if(randomNum === 2){
        computerChoice = "paper";
    } else{
        computerChoice = "scissors";
    }

    return computerChoice;
}

function getUserChoice(){
    let playerChoice;

    while(true){
        playerChoice = prompt('Enter "Rock", "Paper", or "Scissors": ');
        if(playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors'){
            break;
        } else if (playerChoice === null){
            playerChoice = 'no response';
            break;
        }
        else{
            alert('Enter a valid response');
            continue;
        }
    }

    return playerChoice.toLowerCase();
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function playRound(computerSelection, playerSelection){
    if(computerSelection === playerSelection){
        return 'It was a tie';
    } else if(computerSelection === 'rock' && playerSelection === 'paper'){
        return 'Paper beats Rock. You win!';
    } else if(computerSelection === 'paper' && playerSelection === 'scissors'){
        return 'Scissors beats Paper. You win!';
    } else if(computerSelection === 'scissors' && playerSelection === 'rock'){
        return 'Rock beats Scissors. You win!';
    } else{
        return `${capitalize(computerSelection)} beats ${capitalize(playerSelection)}. You lose!`
    }
}

function game(){
    for(let i = 0; i < 5; i++){
        computerSelection = getComputerChoice();
        playerSelection = getUserChoice();

        if(playerSelection !== 'no response'){
            console.log(playRound(computerSelection, playerSelection));
        } else {
            console.log('User declined to play');
            break;
        }
    }
    console.log('The game has ended');
}

game();


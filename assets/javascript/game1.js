// Guess the word

var words = [
    "bad",
    "gnarly",
    "tubular",
    "totally",
    "bod",
    "like",
    "motor",
    "radical",
    "righteous",
    "spazz",
    "mental",
    "harsh",
    "tight",
    "sick",
    "flash",
    "down",
    "deadly",
    "clutch",
    "schweet",
    "wicked",
    "dweeb",
    "barf",
    "burn",
    "rad"
];

// var randWord = words[Math.floor(Math.random() * words.length)];
var word = words[Math.floor(Math.random() * words.length)];


var guessArray = [];
for (var i = 0; i < word.length; i++) {
    guessArray[i] = "_";
};

var winSound = document.getElementById("win-sound");
var loseSound = document.getElementById("lose-sound");
var guessedWord = guessArray.join(" ");
var wordGuess = document.getElementById("word-guess");
wordGuess.textContent = guessedWord;
var guesses = document.getElementById("number-guess");
var winsDoc = document.getElementById("wins");
var losesDoc = document.getElementById("loses");
var wins = 0;
var lose = 0;
var letterGuess = 15;
guesses.textContent = "Guesses Left: " + letterGuess.toString();
var letterDisplay = document.getElementById("letter-guess");
function reset() {
    word = words[Math.floor(Math.random() * words.length)];
    guessArray = [];
    for (var i = 0; i < word.length; i++) {
        guessArray[i] = "_";
    };
    guessedWord = guessArray.join(" ");
    wordGuess.textContent = guessedWord;
    letterGuess = 15;
    guesses.textContent = "Guesses Left: " + letterGuess.toString();
    letterDisplay.innerHTML = "";
};

function update() {
    winsDoc.textContent = "Wins: " + wins.toString();
    losesDoc.textContent = "Losses: " + lose.toString();
}


document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();
    if (userInput) {
        letterGuess--;
        guesses.textContent = "Guesses Left: " + letterGuess.toString();
        var letterDiv = document.createElement("div");
        letterDiv.setAttribute("class", "float-left mx-2 center-text");
        letterDiv.textContent = userInput.toString() + " ";
        letterDisplay.appendChild(letterDiv);
    }

    for (var j = 0; j < word.length; j++) {
        if (letterGuess === 0) {
            wordGuess.textContent = "You lose";
            loseSound.play();
            setTimeout(function () {
                reset();
            }, 2000);
        } else if (word.split("")[j] == userInput) {
            guessArray[j] = userInput;
            wordGuess.textContent = guessArray.join(" ");
            if (word === guessArray.join("")) {
                wordGuess.textContent = "YOU WIN!";
                winSound.play();
                setTimeout(function () {
                    reset();
                }, 2000);
            };
        };
    };

    if (wordGuess.textContent == "You lose") {
        lose++;
        update();
    } else if (wordGuess.textContent == "YOU WIN!") {
        wins++;
        update();
    };



};
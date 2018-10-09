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
var letterGuess = 6;
guesses.textContent = "Guesses Left: " + letterGuess.toString();
var letterDisplay = document.getElementById("letter-guess");
function reset() {
    word = words[Math.floor(Math.random() * words.length)];
    guessArray = [];
    guessedLetters = [];
    for (var i = 0; i < word.length; i++) {
        guessArray[i] = "_";
    };
    guessedWord = guessArray.join(" ");
    wordGuess.textContent = guessedWord;
    letterGuess = 6;
    guesses.textContent = "Guesses Left: " + letterGuess.toString();
    letterDisplay.innerHTML = "";
    console.log(word);
};

function update() {
    winsDoc.textContent = "Wins: " + wins.toString();
    losesDoc.textContent = "Losses: " + lose.toString();
    guesses.textContent = "Guesses Left: " + letterGuess.toString();
}

var guessedLetters = [];
console.log(word);
document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();
    var keys = event.keyCode;
    var wordArray = word.split("");
    
    if (letterGuess != 0 && wordGuess.textContent !== "YOU WIN!" && keys >= 65 && keys <= 90 || key == 8){
        if (guessedLetters.indexOf(userInput) === -1) {
            guessedLetters.push(userInput);
            var letterDiv = document.createElement("div");
            letterDiv.setAttribute("class", "float-left mx-2 center-text letterDiv");
            letterDiv.textContent = userInput.toString() + " ";
            letterDisplay.appendChild(letterDiv);
            if (letterGuess < 0){
                    letterGuess = 0;
            };
            if(wordArray.indexOf(userInput) === -1){
                letterGuess--;
            };
            update();
            console.log(guessedLetters);
        }
    
        
  
        for (var j = 0; j < word.length; j++) {
            if (wordArray[j] == userInput) {
                guessArray[j] = userInput;
                wordGuess.textContent = guessArray.join(" ");
            };    
        };

        if (word === guessArray.join("")) {
            wordGuess.textContent = "YOU WIN!";
            winSound.play();
            wins++;
            update();
            setTimeout(function () {
                reset();
            }, 2000);
        } else if (letterGuess === 0) {
            wordGuess.textContent = "You lose";
            loseSound.play();
            lose++;
            update();
            setTimeout(function () {
                reset();
            }, 2000);
        };
    };

};  

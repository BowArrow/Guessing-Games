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

var guessedWord = guessArray.join(" ");
var lettersRemain = word.length;
var wordGuess = document.getElementById("word-guess");
wordGuess.textContent = guessedWord

document.onkeyup = function (event) {
    
    var userInput = event.key.toLowerCase();
    for (var j = 0; j < word.length; j++) {
        if (word.split("")[j] == userInput) {
            guessArray[j] = userInput;
            wordGuess.textContent = guessArray.join(" ");
        }

    }

};
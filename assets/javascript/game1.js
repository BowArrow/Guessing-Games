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


// var randWord (){} = words[Math.floor(Math.random() * words.length)];
function randWord (){
    word = words[Math.floor(Math.random() * words.length)];
}
randWord()
var gameObj = {
    sounds: {
        winSound: document.getElementById("win-sound"),
        loseSound: document.getElementById("lose-sound")
    },
    elements: {
        wordGuess: document.getElementById("word-guess"),
        guesses: document.getElementById("number-guess"),
        winsDoc: document.getElementById("wins"),
        losesDoc: document.getElementById("loses"),
        letterDisplay: document.getElementById("letter-guess")
    },
    score: {
        wins: 0,
        lose: 0,
        letterGuess: 6
    },
    array: {
        guessArray: [],
        guessedLetters: []
    }
}

var array = gameObj.array;
var score = gameObj.score;
var sound = gameObj.sounds;
var element = gameObj.elements;

for (var i = 0; i < word.length; i++) {
    array.guessArray[i] = "_";
};

var guessedWord = array.guessArray.join(" ");
element.wordGuess.textContent = guessedWord;

element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();
function reset() {
    randWord();
    array.guessArray = [];
    array.guessedLetters = [];
    for (var i = 0; i < word.length; i++) {
        array.guessArray[i] = "_";
    };
    guessedWord = array.guessArray.join(" ");
    element.wordGuess.textContent = guessedWord;
    score.letterGuess = 6;
    element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();
    element.letterDisplay.innerHTML = "";
    console.log(word);
};

function update() {
    element.winsDoc.textContent = "Wins: " + score.wins.toString();
    element.losesDoc.textContent = "Losses: " + score.lose.toString();
    element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();
}

console.log(word);
document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();
    var keys = event.keyCode;
    var wordArray = word.split("");

    if (score.letterGuess != 0 && element.wordGuess.textContent !== "YOU WIN!" && keys >= 65 && keys <= 90 || key == 8) {
        if (array.guessedLetters.indexOf(userInput) === -1) {
            array.guessedLetters.push(userInput);
            var letterDiv = document.createElement("div");
            letterDiv.setAttribute("class", "float-left mx-2 center-text letterDiv");
            letterDiv.textContent = userInput.toString() + " ";
            element.letterDisplay.appendChild(letterDiv);
            if (score.letterGuess < 0) {
                score.letterGuess = 0;
            };
            if (wordArray.indexOf(userInput) === -1) {
                score.letterGuess--;
            };
            update();
            console.log(array.guessedLetters);
        }



        for (var j = 0; j < word.length; j++) {
            if (wordArray[j] == userInput) {
                array.guessArray[j] = userInput;
                element.wordGuess.textContent = array.guessArray.join(" ");
            };
        };

        if (word === array.guessArray.join("")) {
            element.wordGuess.textContent = "YOU WIN!";
            sound.winSound.play();
            score.wins++;
            update();
            setTimeout(function () {
                reset();
            }, 2000);
        } else if (score.letterGuess === 0) {
            element.wordGuess.textContent = "You lose";
            sound.loseSound.play();
            score.lose++;
            update();
            setTimeout(function () {
                reset();
            }, 2000);
        };
    };

};  

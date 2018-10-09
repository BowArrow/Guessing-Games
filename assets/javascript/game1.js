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
        win: document.getElementById("win-sound"),
        lose: document.getElementById("lose-sound")
    },
    elements: {
        wordGuess: document.getElementById("word-guess"),
        guesses: document.getElementById("number-guess"),
        winsDoc: document.getElementById("wins"),
        losesDoc: document.getElementById("loses"),
        letterDisplay: document.getElementById("letter-guess")
    },
    score: {
        win: 0,
        lose: 0,
        letterGuess: 6
    },
    array: {
        guessArray: [],
        guessedLetters: []
    },
    string: {
        win: "YOU WIN!",
        lose: "You lose"
    }

}

var string = gameObj.string;
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
    element.winsDoc.textContent = "Wins: " + score.win.toString();
    element.losesDoc.textContent = "Losses: " + score.lose.toString();
    element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();
}

console.log(word);
document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase();
    var keys = event.keyCode;
    var wordArray = word.split("");

    if (score.letterGuess != 0 && element.wordGuess.textContent !== "YOU WIN!" && keys >= 65 && keys <= 90 || keys == 8) {
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
        
        function final(any) {
            element.wordGuess.textContent = string[any];
            sound[any].play();
            score[any]++
            update();
            setTimeout(function () {
                reset();
            }, 2000);
        }

        if (word === array.guessArray.join("")) {
            final('win');
        } else if (score.letterGuess === 0) {
            final('lose');
        };
    };

};  

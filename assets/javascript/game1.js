// Guess the word

var words = [ //array of our words, you can keep adding as many as you'd like.
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


function randWord (){ //randomizes the array of words
    word = words[Math.floor(Math.random() * words.length)];
}
randWord(); //calls the function for the initial word.
var gameObj = { //This object contains elements, intergers, arrays, and strings for use later
    sounds: { //divided into different groups based on what they do
        win: document.getElementById("win-sound"), //inside groups that deal with win or lose, they are organized with just win or lose for functionality later on
        lose: document.getElementById("lose-sound")
    },
    elements: {
        wordGuess: document.getElementById("word-guess"),
        guesses: document.getElementById("number-guess"),
        winsDoc: document.getElementById("wins"),
        losesDoc: document.getElementById("loses"),
        letterDisplay: document.getElementById("letter-guess")
    },
    score: { //all intergers go here and will be updated to go either up or down depending on what we want
        win: 0,
        lose: 0,
        letterGuess: 6
    },
    array: {
        guessArray: [], //this will be our container for the interactive guessed word
        guessedLetters: [] //this will be our container to check for letters we've already guessed
    },
    string: {
        win: "YOU WIN!",
        lose: "You lose"
    }

}

//this variables shorten the object chain so that you can call the desired property easily.
var string = gameObj.string;
var array = gameObj.array;
var score = gameObj.score;
var sound = gameObj.sounds;
var element = gameObj.elements;

//This loop fills our GuessArray with blank spaces the length of the random word
for (var i = 0; i < word.length; i++) {
    array.guessArray[i] = "_";
};

//The two lines below set a variable guess word to join the array that is containing our placeHolders or correct letters with spaces in between
var guessedWord = array.guessArray.join(" ");

//This inicializes our guesses left and calls the object score.letterGuess which gives us 6 guesses
element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();

//Inside your reset function you want to reset all variables and arrays back to what they started as
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
    // console.log(word);
};

//This update function will update what we see on the website
function update() {
    element.winsDoc.textContent = "Wins: " + score.win.toString();
    element.losesDoc.textContent = "Losses: " + score.lose.toString();
    element.guesses.textContent = "Guesses Left: " + score.letterGuess.toString();
    element.wordGuess.textContent = guessedWord;
}
update();

// console.log(word);
document.onkeyup = function (event) {
    var userInput = event.key.toLowerCase(); //sets the 'userInput' onkey event to lowercase 
    var keys = event.keyCode; //initializes the key event to keycode to use for parameters
    var wordArray = word.split(""); //this will split the random word into an array to use in for loops

    //This first if statement only allows user input if you haven't won or lost and if you're pressing letters
    if (score.letterGuess != 0 && element.wordGuess.textContent !== "YOU WIN!" && keys >= 65 && keys <= 90 || keys == 8) {
        //I got this idea from Dennis
        //This if statement adds user input to our guessedLetter array as long as we haven't already pressed that letter
        if (array.guessedLetters.indexOf(userInput) === -1) {
            array.guessedLetters.push(userInput);
            
            //This shows us letters on screen
            var letterDiv = document.createElement("div");
            letterDiv.setAttribute("class", "float-left mx-2 center-text letterDiv");
            letterDiv.textContent = userInput.toString() + " ";
            element.letterDisplay.appendChild(letterDiv);
            
            //This makes sure guesses left can't go below 0
            if (score.letterGuess < 0) {
                score.letterGuess = 0;
            };
            
            //This subtracks from guesses left as long as you guess the wrong letter
            if (wordArray.indexOf(userInput) === -1) {
                score.letterGuess--;
            };
            update();
            // console.log(array.guessedLetters);
        }


        //This for loop compares the user input to the letters in the random word
        for (var j = 0; j < word.length; j++) {
            if (wordArray[j] == userInput) {
                //if the letter did match it's added to the guess array in the same spot it is in the word
                array.guessArray[j] = userInput;
                 //this shows us on screen what has changed
                 update();
            };
        };
        
        //this function works with our object to call any final functionality to the game
        function final(any) {
            element.wordGuess.textContent = string[any]; // will show win or lose string property
            sound[any].play(); //will play win or lose sound
            score[any]++; //will increment win or lose score
            update(); 
            setTimeout(function () { //timer so that you can enjoy the music and strings
                reset();
            }, 2000);
        }

        //If you win or lose it calls the function with that word
        if (word === array.guessArray.join("")) {
            final('win');
        } else if (score.letterGuess === 0) {
            final('lose');
        };
    };

};  

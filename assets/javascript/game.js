//global variables
var numPlay = 0;
var firstRun = true;
//object
const hangman = {
    wordList: ["LUFFY", "ZORO", "NAMI", "USOPP", "SANJI", "CHOPPER", 
    "ROBIN", "FRANKY", "BROOK", "JINBE"],
    elementList: [],
    theWord: "",
    theGuess: [],
    theNumWins: 0,
    theLettersGuessed: [],
    theNumGuessRemains: 10,
    getWord: function(index) {
        hangman.theWord = hangman.wordList[index];
        hangman.theGuess = [];
        hangman.theLettersGuessed = [];
        hangman.theNumGuessRemains = 10;
        for(var i=0; i<hangman.theWord.length; i++) {
            hangman.theGuess.push("_");
        }
        document.getElementById("characterProfile").src = "assets/images/"
            +hangman.theWord.toLowerCase()+".png";
    },
    updateGuess: function(char) {
        for(var i=0; i<hangman.theWord.length;i++) {
            if(hangman.theWord.charAt(i).toUpperCase()===char.toUpperCase()) {
                hangman.theGuess[i] = hangman.theWord.charAt(i);
            }
        }
    },
    print: function() {
        document.querySelector("#thePirate").innerHTML = hangman.theGuess.join(" ");
        document.querySelector("#numWins").innerHTML = "Wins: "+hangman.theNumWins;
        document.querySelector("#numGuessesRemaining").innerHTML = "Number of Guesses Remaining: " 
        + hangman.theNumGuessRemains;
        document.querySelector("#lettersGuessed").innerHTML = hangman.theLettersGuessed.join(" ");
    },
    updateGame: function(keyPressed) {
        var letters = /^[A-Za-z]+$/;
        if(keyPressed.length == 1 && keyPressed.match(letters)){
            hangman.updateGuess(keyPressed);
            hangman.theNumGuessRemains--;
            hangman.theLettersGuessed.push(keyPressed);
            hangman.print();
            document.querySelector("#information").innerHTML = "Keep going!";
        }
    },
    isWin: function() {
        if(hangman.theGuess.join("")===hangman.theWord) {
            hangman.theNumWins++;
            document.querySelector("#information").innerHTML = "You Win! Press any key to play again!";
            return true;
        }
        return false;
    },
    setUpGame: function() {
        index = Math.floor((Math.random()*hangman.wordList.length));
        while(hangman.elementList.includes(index)) {
            index = Math.floor((Math.random()*hangman.wordList.length));
        }
        hangman.elementList.push(index);
        if(hangman.elementList.length==hangman.wordList.length) {
            hangman.elementList = [];
        }
        hangman.getWord(index);
        hangman.print();
    },
    play: function() {

        if(firstRun) {
            firstRun = false;
            hangman.setUpGame();
            numPlay++;
        }

        var keyPressed = event.key;
        keyPressed = keyPressed.toUpperCase();
        if(!hangman.isWin() && hangman.theNumGuessRemains>0) {
            if(!hangman.theLettersGuessed.includes(keyPressed)) {
                hangman.updateGame(keyPressed);
            }
        } else {
            //setUpGame
            if(hangman.theNumGuessRemains==0 && !hangman.isWin()) {
                document.getElementById("characterProfile").src = "assets/images/onePiece.png";
                document.querySelector("#information").innerHTML = "You Lose! Press any key to play again!";
            }
            hangman.setUpGame();
            console.log("The pirate is "+hangman.theWord);
            numPlay++;
        }
    }
}

document.addEventListener("keydown", hangman.play);

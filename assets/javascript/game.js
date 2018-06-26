// Declaring the Global Variables
var currentWord = null;
var userKey;
var numberOfGames = 0;
var counter = 0;
var gambino = ['g', 'a', 'm', 'b', 'i', 'n', 'o'];
var kartel = ['k', 'a', 'r', 't', 'e', 'l'];
var drake = ['d', 'r', 'a', 'k', 'e'];
var swift = ['s', 'w', 'i', 'f', 't'];

// Created the Hangman object with local variables and functions
var hangman = {
  wins: 0,
  guesses: 10,
  lettersGuessed: [],
  wordBank: [gambino, kartel, drake, swift],

  // Start game function.
  startGame: function() {
    // Checks if there are more words available in the Word Bank
    if (numberOfGames > 3) {
      alert("YOU'VE FINISHED THE GAME");
    } else {
      // if there are more words, build the game
      currentWord = this.wordBank[numberOfGames];
      this.guesses = 10;
      this.lettersGuessed = [];
      counter = 0;
      document.getElementById('currentWord').innerHTML = '';
      for (i = 0; i < currentWord.length; i++) {
        document.getElementById('currentWord').innerHTML +=
          '<span id=letter-' + i + '>_ </span>';
      }
      document.getElementById('guesses').innerHTML = hangman.guesses;
      document.getElementById('userKey').innerHTML = '';
    }
  },

  // Function to check if the user Guess is part of the letters in the current word
  checkCurrentWord: function() {
    for (r = 0; r < currentWord.length; r++) {
      if (currentWord[r] === userKey) {
        // if true, replace letter in game
        document.getElementById('letter-' + r).innerHTML = userKey;
        hangman.lettersGuessed.push(userKey);
        document.getElementById('userKey').innerHTML = hangman.lettersGuessed;
        counter++;
        return true;
      } else {
      }
    }
  },

  // Function to check if the user Guess has been guessed before
  checkLettersGuessed: function() {
    for (i = 0; i < this.lettersGuessed.length; i++) {
      if (this.lettersGuessed[i] == userKey) {
        return true;
      } else {
      }
    }
  }
};

document.onkeyup = function(event) {
  // Convert user Key into a variable
  userKey = event.key;

  // Checks if you've started a Game by seeing if the Current Word Var is empty
  if (currentWord == null) {
    // Starts the Hangman Game
    hangman.startGame();
  }

  if (hangman.checkLettersGuessed() === true) {
    // if true, do nothing. Else Check if the letter matches word
  } else if (hangman.checkCurrentWord() === true) {
    // if true, do nothing. The function will update accordingly
  } else {
    // if it is not word guessed before and not part of the current word
    // add to letters guessed
    hangman.lettersGuessed.push(userKey);
    // updated number of guessed
    hangman.guesses -= 1;
    // update the HTML
    document.getElementById('guesses').innerHTML = hangman.guesses;
    document.getElementById('userKey').innerHTML = hangman.lettersGuessed;
  }

  // Check to see if you Won or Lost the game
  if (hangman.guesses < 1) {
    alert('You lost!');
    numberOfGames++;
    hangman.startGame();
  } else if (counter === currentWord.length) {
    alert('You Win!');
    numberOfGames++;
    hangman.wins++;
    document.getElementById('wins').innerHTML = hangman.wins;
    hangman.startGame();
  }
};

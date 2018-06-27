// Declaring the Global Variables
var currentWord = null;
var userKey;
var numberOfGames = 0;
var counter = 0;
var letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
var gambino = ['g', 'a', 'm', 'b', 'i', 'n', 'o'];
var kartel = ['k', 'a', 'r', 't', 'e', 'l'];
var cent = ['c', 'e', 'n', 't'];
var swift = ['s', 'w', 'i', 'f', 't'];

// Created the Hangman object with local variables and functions
var hangman = {
  wins: 0,
  guesses: 10,
  lettersGuessed: [],
  wordBank: [gambino, kartel, cent, swift],

  // Start game function.
  startGame: function() {
    // Checks if there are more words available in the Word Bank
    if (numberOfGames > 3) {
      alert("YOU'VE FINISHED THE GAME");
      document.getElementById('games').innerHTML = 0;
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
      document.getElementById('games').innerHTML = 4 - numberOfGames;
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
  },

  // Function to check if the user input is valid letter
  checkLetter: function() {
    for (i = 0; i < letters.length; i++) {
      if (letters[i] == userKey) {
        return true;
      } else {
      }
    }
  }
};

// Primary Function to listen for user INput
document.onkeyup = function(event) {
  // Convert user Key into a variable
  userKey = event.key;

  // Checks if you've started a Game by seeing if the Current Word Var is empty
  if (currentWord == null) {
    // Starts the Hangman Game
    hangman.startGame();
  }

  // First check if the user input is a valid letter
  if (hangman.checkLetter() === true) {
    // If true, Check if the letter has been guessed before
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
  } else {
    alert('Thats not a valid letter!');
  }

  // Check to see if you Won or Lost the game
  if (hangman.guesses < 1) {
    alert('You lost!');
    numberOfGames++;
    hangman.startGame();
  } else if (counter === currentWord.length) {
    numberOfGames++;
    hangman.wins++;
    document.getElementById('wins').innerHTML = hangman.wins;
    hangman.startGame();
    alert('You Win!');
  }
};

// Global Function to Toggle Hints
function toggleHints() {
  var x = document.getElementById('hints');
  if (x.style.display === 'none') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
    setTimeout(toggleHints, 5000);
  }
}

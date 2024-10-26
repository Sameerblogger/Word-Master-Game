const words = [
  'apple', 'banana', 'cherry', 'grapes', 'mango', 'orange', 'peach', 'pear',
  'plum', 'kiwi', 'melon', 'papaya', 'strawberry', 'blueberry', 'pineapple',
  'watermelon', 'avocado', 'coconut', 'lemon', 'lime', 'raspberry', 'blackberry',
  'carrot', 'broccoli', 'spinach', 'potato', 'tomato', 'cucumber', 'onion',
  'garlic', 'pepper', 'lettuce', 'celery', 'radish', 'zucchini', 'eggplant',
  'pumpkin', 'squash', 'beet', 'asparagus', 'cauliflower', 'artichoke',
  'corn', 'peas', 'greenbean', 'sweetpotato', 'turnip', 'parsnip',
  'kale', 'chard', 'bokchoy', 'fennel', 'endive', 'dill', 'sage',
  'thyme', 'basil', 'parsley', 'cilantro', 'mint', 'rosemary',
  'chickpea', 'lentil', 'quinoa', 'rice', 'barley', 'oat', 'wheat',
  'sorghum', 'rye', 'millet', 'cornmeal', 'tofu', 'tempeh',
  'almond', 'cashew', 'walnut', 'pecan', 'hazelnut', 'peanut',
  'chia', 'flaxseed', 'pumpkinseed', 'sunflowerseed', 'sesameseed',
  'soybean', 'coconutmilk', 'oliveoil', 'avocadooil', 'vinegar',
  'honey', 'maplesyrup', 'syrup', 'jam', 'jelly', 'salsa',
  'sourcream', 'yogurt', 'cheese', 'milk', 'butter', 'cream',
  'egg', 'fish', 'chicken', 'beef', 'pork', 'lamb',
  'shrimp', 'crab', 'lobster', 'scallop', 'clam', 'oyster',
  'tuna', 'salmon', 'trout', 'sardine', 'mackerel', 'cod',
  'halibut', 'catfish', 'bacon', 'sausage', 'ham', 'hotdog',
  'burger', 'sandwich', 'pizza', 'pasta', 'sushi', 'taco',
  'quesadilla', 'burrito', 'falafel', 'curry', 'stew', 'soup',
  'cereal', 'fettuccine', 'chocolate', 'gelato', 'pudding',
  'brownie', 'donut', 'croissant', 'bagel', 'pancake',
  'waffle', 'cookie', 'scone', 'tart', 'muffin', 'pita',
  'pesto', 'hummus', 'syrniki', 'cabbage', 'squashblossom',
  'cantaloupe', 'honeydew', 'passionfruit', 'dragonfruit',
  'pomegranate', 'jackfruit', 'nectarine', 'bloodorange',
  'study', 'homework', 'assignment', 'project', 'research',
  'notebook', 'textbook', 'lecture', 'curriculum', 'exam',
  'quiz', 'tutoring', 'notes', 'studygroup', 'revision',
  'summary', 'brainstorm', 'analysis', 'presentation', 'goal',
  'planning', 'focus', 'motivation', 'deadline', 'time management',
  'learning', 'understanding', 'concept', 'idea', 'strategy',
  'skill', 'practice', 'review', 'test', 'feedback'
];

let chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
let triesLeft = 6;
let guessedLetters = [];
let hintGiven = false;

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeLabel = document.getElementById('dark-mode-label');
darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  darkModeLabel.textContent = darkModeToggle.checked ? 'Disable Dark Mode' : 'Enable Dark Mode';
});

// Display word as underscores
function displayWord() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  chosenWord.split('').forEach(letter => {
    wordContainer.innerHTML += guessedLetters.includes(letter) ? letter : '_';
    wordContainer.innerHTML += ' ';
  });
}

// Generate hints (first letter of the word)
function giveHint() {
  if (!hintGiven) {
    document.getElementById('hint').textContent = `Hint: The word starts with "${chosenWord[0]}"`;
    hintGiven = true;
  }
}

// Disable all keyboard buttons
function disableKeyboard() {
  document.querySelectorAll('.key').forEach(key => key.disabled = true);
}

// Enable all keyboard buttons
function enableKeyboard() {
  document.querySelectorAll('.key').forEach(key => key.disabled = false);
}

// Check if the word is completely guessed
function checkWin() {
  return chosenWord.split('').every(letter => guessedLetters.includes(letter));
}

// Handle submission from the input box
document.getElementById('submit-word').addEventListener('click', function () {
  const wordInput = document.getElementById('word-input');
  const guessedWord = wordInput.value.toUpperCase();
  wordInput.value = ''; // Clear the input box

  if (guessedWord === chosenWord) {
    document.getElementById('message').textContent = 'You won!';
    document.getElementById('restart-game').classList.remove('hidden');
    disableKeyboard();
  } else {
    triesLeft--;
    document.getElementById('tries').textContent = triesLeft;
    if (triesLeft === 0) {
      document.getElementById('message').textContent = `Game over! The word was ${chosenWord}`;
      document.getElementById('restart-game').classList.remove('hidden');
      disableKeyboard();
    } else {
      document.getElementById('message').textContent = 'Incorrect! Try again!';
    }
  }
});

// Create and handle virtual keyboard
const keyboard = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const keyboardContainer = document.getElementById('keyboard');

keyboard.forEach(letter => {
  const keyButton = document.createElement('button');
  keyButton.classList.add('key');
  keyButton.textContent = letter;
  keyButton.addEventListener('click', () => handleKeyPress(letter));
  keyboardContainer.appendChild(keyButton);
});

function handleKeyPress(letter) {
  if (triesLeft === 0) return; // Prevent action if game over

  if (guessedLetters.includes(letter)) {
    document.getElementById('message').textContent = `You've already guessed "${letter}"`;
    return;
  }
  guessedLetters.push(letter);
  if (chosenWord.includes(letter)) {
    document.getElementById('message').textContent = `"${letter}" is correct!`;
  } else {
    triesLeft--;
    document.getElementById('tries').textContent = triesLeft;
    document.getElementById('message').textContent = `"${letter}" is incorrect!`;
  }
  displayWord();
  if (checkWin()) {
    document.getElementById('message').textContent = 'You won!';
    document.getElementById('restart-game').classList.remove('hidden');
    disableKeyboard();
  } else if (triesLeft === 0) {
    document.getElementById('message').textContent = `Game over! The word was ${chosenWord}`;
    document.getElementById('restart-game').classList.remove('hidden');
    disableKeyboard();
  }
}

// Set difficulty level and tries
function setDifficulty() {
  const difficulty = document.getElementById('difficulty').value;

  if (difficulty === "easy") {
    triesLeft = 8;
    hintGiven = false;
  } else if (difficulty === "medium") {
    triesLeft = 6;
    hintGiven = false;
  } else if (difficulty === "hard") {
    triesLeft = 4;
    hintGiven = false;
  }

  document.getElementById('tries').textContent = triesLeft;
}

// Show winning pop-up modal
function showWinModal() {
  const modal = document.getElementById('win-modal');
  const closeButton = document.querySelector('.close');
  const playAgainButton = document.getElementById('play-again');

  modal.style.display = 'block';

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  playAgainButton.addEventListener('click', () => {
    modal.style.display = 'none';
    restartGame();
  });
}

// Check win and show modal
function checkWin() {
  if (chosenWord.split('').every(letter => guessedLetters.includes(letter))) {
    document.getElementById('message').textContent = 'You guessed it! Well done!';
    document.querySelectorAll('.key').forEach(key => key.disabled = true);
    showWinModal();
    return true;
  }
  return false;
}

// Restart game
function restartGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  guessedLetters = [];
  setDifficulty(); // Apply selected difficulty level
  displayWord();
  document.getElementById('hint').textContent = '';
  document.getElementById('message').textContent = '';
  document.getElementById('restart-game').classList.add('hidden');
  enableKeyboard();
}

// Add event listener for restart button
document.getElementById('restart-game').addEventListener('click', restartGame);

// Initialize game
setDifficulty();
displayWord();

// Event listener for difficulty selection
document.getElementById('difficulty').addEventListener('change', () => {
  setDifficulty();
  displayWord();
});

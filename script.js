let level = 1;
let current = 1;
const maxLevel = 8;
let startTime;
let timerInterval;
let finalTime;

// ✅ Speak number using Speech Synthesis
function speakNumber(number) {
  const utterance = new SpeechSynthesisUtterance(number.toString());
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// ✅ Start Game
function startGame() {
  document.getElementById('instruction-modal').style.display = 'none';
  startTime = Date.now();
  startTimer();
  loadLevel();
}

// ✅ Start Timer
function startTimer() {
  // ✅ Remove existing timer element if any
  const existingTimer = document.getElementById("timer");
  if (existingTimer) {
    existingTimer.remove();
  }

  const timerElement = document.createElement("h3");
  timerElement.id = "timer";
  document.querySelector(".game-container").insertBefore(timerElement, document.getElementById("game-board"));
  
  // ✅ Start new interval
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerElement.innerText = `Time: ${elapsed}s`;
  }, 1000);
}


// ✅ Stop Timer
function stopTimer() {
  clearInterval(timerInterval);
  finalTime = Math.floor((Date.now() - startTime) / 1000);
}

// ✅ Load next level
function nextLevel() {
  level++;
  document.getElementById('next-level-btn').style.display = 'none';
  loadLevel();
}

// ✅ Load level content
function loadLevel() {
  const board = document.getElementById('game-board');
  const levelDisplay = document.getElementById('level-display');
  board.innerHTML = '';
  current = 1;

  const totalCards = level + 2;
  const numbers = shuffle([...Array(totalCards).keys()].map(n => n + 1));

  const columns = Math.ceil(Math.sqrt(totalCards));
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  levelDisplay.innerText = `Level: ${level}`;

  numbers.forEach(num => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = num;

    card.onclick = () => {
      speakNumber(num); // 🔈 Speak on click
      if (parseInt(card.innerText) === current) {
        card.classList.add('correct');
        card.style.pointerEvents = 'none';
        current++;
        if (current > totalCards) {
          if (level === maxLevel) {
            stopTimer(); // ⏱ Stop timer
            showFinalScreen();
          } else {
            document.getElementById('next-level-btn').style.display = 'inline-block';
          }
        }
      } else {
        card.classList.add('wrong');
        setTimeout(() => card.classList.remove('wrong'), 500);
      }
    };

    board.appendChild(card);
  });
}

// ✅ Final screen with score and time
function showFinalScreen() {
  document.getElementById('final-screen').style.display = 'flex';
  const finalScreen = document.getElementById('final-screen');
  finalScreen.querySelector('p').innerHTML = `
    You’ve completed all levels!<br>
    🕒 Time Taken: <strong>${finalTime} seconds</strong><br>
    🏆 Score: <strong>10</strong>
  `;
}

function restartGame() {
  level = 1;
  document.getElementById('final-screen').style.display = 'none';
  clearInterval(timerInterval); // ✅ stop any previous timer
  startTime = Date.now();
  startTimer();
  loadLevel();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let level = 1;
let current = 1;
const maxLevel = 8;

function startGame() {
  document.getElementById('instruction-modal').style.display = 'none';
  loadLevel();
}

function nextLevel() {
  level++;
  document.getElementById('next-level-btn').style.display = 'none';
  loadLevel();
}

function loadLevel() {
  const board = document.getElementById('game-board');
  const levelDisplay = document.getElementById('level-display');
  board.innerHTML = '';
  current = 1;

  const totalCards = level + 2; // e.g. Level 1 = 3 cards, Level 2 = 4 cards...
  const numbers = shuffle([...Array(totalCards).keys()].map(n => n + 1));

  const columns = Math.ceil(Math.sqrt(totalCards));
  board.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  levelDisplay.innerText = `Level: ${level}`;

  numbers.forEach(num => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = num;

    card.onclick = () => {
      if (parseInt(card.innerText) === current) {
        card.classList.add('correct');
        card.style.pointerEvents = 'none';
        current++;
        if (current > totalCards) {
          if (level === maxLevel) {
            document.getElementById('final-screen').style.display = 'flex';
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

function restartGame() {
  level = 1;
  document.getElementById('final-screen').style.display = 'none';
  loadLevel();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

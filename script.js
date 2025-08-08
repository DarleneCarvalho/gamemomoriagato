const cardsArray = [
  'img/gato1.png',
  'img/gato2.png',
  'img/gato3.png',
  'img/gato4.png',
  'img/gato5.png',
  'img/gato6.png',
  'img/gato7.png',
  'img/gato8.png',
];

let gameGrid = [...cardsArray, ...cardsArray]; // 8 pares = 16 cartas
gameGrid.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
const clickSound = document.getElementById('clickSound');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let points = 0;
let pairsFound = 0;
const totalPairs = cardsArray.length;

function updateScore() {
  document.getElementById('score').textContent = `Pontos: ${points}`;
}

function checkWin() {
  if (pairsFound === totalPairs) {
    document.getElementById('winMessage').textContent = '🎉 Parabéns! Você encontrou todos os pares! 🎉';
  }
}

function createCard(imageSrc) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">🐾</div>
      <div class="card-back"><img src="${imageSrc}" alt="Gatinho fofo" /></div>
    </div>
  `;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('flipped')) return;

    clickSound.currentTime = 0;
    clickSound.play();

    card.classList.add('flipped');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      const img1 = firstCard.querySelector('img').src;
      const img2 = secondCard.querySelector('img').src;

      if (img1 === img2) {
        points++;
        pairsFound++;
        updateScore();
        checkWin();
        resetTurn();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          resetTurn();
        }, 1000);
      }
    }
  });

  return card;
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Criar e adicionar todas as cartas ao tabuleiro
gameGrid.forEach(image => {
  const cardElement = createCard(image);
  gameBoard.appendChild(cardElement);
});
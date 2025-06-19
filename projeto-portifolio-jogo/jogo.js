document.addEventListener('DOMContentLoaded', () => {
  const cardSymbols = [
    'img/joui-1.jpg',
    'img/joui-2.jpg',
    'img/kitty-1.jpg',
    'img/kitty-2.jpg',
    'img/rengoku-1.jpg',
    'img/rengoku-2.jpg'
  ];

  let score = 0;
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  const gameContainer = document.querySelector('.jogo-sessao-ofc .memory-game');
  const scoreDisplay = document.getElementById('score');
  const restartBtn = document.getElementById('restartBtn');

  function createCards() {
    const symbols = [...cardSymbols, ...cardSymbols];
    shuffle(symbols);

    gameContainer.innerHTML = '';

    symbols.forEach(symbol => {
      const card = document.createElement('div');
      card.classList.add('cardjogo');
      card.innerHTML = `
        <div class="card-face front bg-light border rounded shadow-sm"></div>
        <div class="card-face back bg-white border rounded shadow-sm d-flex align-items-center justify-content-center">
          <img src="${symbol}" alt="carta" class="card-img img-fluid rounded">
        </div>
      `;
      card.dataset.symbol = symbol;
      card.addEventListener('click', flipCard);
      gameContainer.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    score++;
    scoreDisplay.textContent = score;

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function restartGame() {
    score = 0;
    scoreDisplay.textContent = 0;
    createCards();
  }

  restartBtn.addEventListener('click', restartGame);

  createCards();
});

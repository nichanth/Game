'use strict';

const score0Element = document.getElementById('score_0');
const score1Element = document.getElementById('score_1');
const current0Element = document.getElementById('current_0');
const current1Element = document.getElementById('current_1');
const player0Element = document.querySelector('.player_0');
const player1Element = document.querySelector('.player_1');
const newBtn = document.querySelector('.btn-new');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');

const diceElement = document.querySelector('.dice');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove('player_winner');
  player1Element.classList.remove('player_winner');
  player0Element.classList.add('active-player');
  player1Element.classList.remove('active-player');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current_${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('active-player');
  player1Element.classList.toggle('active-player');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current_${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score_${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.add('player_winner');
      document
        .querySelector(`.player_${activePlayer}`)
        .classList.remove('active-player');
    } else {
      switchPlayer();
    }
  }
});
newBtn.addEventListener('click', init);

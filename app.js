/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying, wins;

var winningScore = 100;
var wins = [0, 0];

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('#input-winning-score').addEventListener('keypress', function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    setScore();
  }
});
document.querySelector('.btn-win').addEventListener('click', setScore);

document.querySelector('.btn-rules').addEventListener('click', printRules);


document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;


    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';

      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
      wins[activePlayer]++;
      console.log(document.querySelector('#num-wins-' + activePlayer).textContent = 'Wins: ' + wins[activePlayer]);

    }
    else {
      nextPlayer();
    }
  }
});

function printRules() {
  var ruleStr = `The goal of Pig Game is to reach the target before your opponent.\n
    1. Each turn, you may roll the dice. If you roll a 1 in either die, your turn ends and you lose all the points you've accumulated this round.
    2. If you don't roll a 1 in either dice, you may choose to roll again or bank your current round points into your score and end your turn.`
  alert(ruleStr);
}

function nextPlayer() {
  roundScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  prevDiceRoll = -1;
}

function init() {
  scores = [0, 0];
  wins = wins;
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  winningScore = winningScore;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');


}

function setScore() {
  var targetScore = document.getElementById('input-winning-score').value;

  if (targetScore !== '') {
    winningScore = targetScore;
    document.getElementById('target-score').textContent = 'TARGET: ' + winningScore;
    document.getElementById('input-winning-score').value = '';
    init();
  }


  // console.log(document.getElementById('winning-score').value);
}

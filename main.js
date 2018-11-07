'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var splashMain;
  var startButton;
  var gameScreen;
  //var gameScreen2;
  //var gameScreen3;
  var gameOverScreen;
  var restartButton;
  var winScreen;

  // splash

  function buildSplash() {
    
    splashMain = buildDom(`
      <main class="buildSplash">
        <h1 class="title">Catch me if you can!</h1>
        <button class="start-button">Start</button>
        <p class="instructions">Instructions: Use the arrow keys to get to the Safezone before getting caught by your chaser.</p>
      </main>
    `);

    document.body.prepend(splashMain);
    startButton = document.querySelector('button');
    startButton.addEventListener('click', destroySplash);
  }

  function destroySplash() {
    splashMain.remove();
    startButton.removeEventListener('click', destroySplash);

    buildGameScreen();
  }

  //game

  function buildGameScreen() {
    gameScreen = buildDom(`
      <main class="game-screen">  
        <canvas class="canvas" width="1000px" height="500px"></canvas>   
      </main>
    `);

    document.body.prepend(gameScreen);

    var canvasElement = document.querySelector('canvas');

    var game = new Game(canvasElement);
    game.start();
    game.onGameOverCallback(destroyGameScreen);
    game.onWinCallback(buildWinScreen);

 
  }

  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }

  function buildGameOverScreen() {
    gameOverScreen = buildDom(`
      <main class="gameover-section">
        <h1 class="gameover-title">Game Over</h1>
        <button class="restart-button-gameover">Restart</button>
      </main>  
    `);


    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyGameOverScreen);

  }

  function destroyGameOverScreen() {
    
    gameOverScreen.remove();
    restartButton.removeEventListener('click', destroyGameOverScreen)

    buildGameScreen();
  }

  function buildWinScreen() {
    winScreen = buildDom(`
      <main class="win-section">
        <h1 class="congrats-message">Congratulations, you made it to the Safezone!!</h1>
        <button class="restart-button-win">Restart</button>
      </main>  
    `);

    gameScreen.remove();
    document.body.prepend(winScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyWinScreen);
  }

  function destroyWinScreen() {
    
    winScreen.remove();
    restartButton.removeEventListener('click', destroyWinScreen);

    buildGameScreen();
  }
  
  

  buildSplash();

}

window.addEventListener('load', main);
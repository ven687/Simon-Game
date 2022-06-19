
let colors = ['green', 'red', 'yellow', 'blue'];
let randomChosenColors = [];
let playerChosenColors = [];
let level;



function startGame() {
  randomChosenColors = [];
  level = 0;
  $(document).keydown(function(){
    if (level === 0) {
      $("h1").text("Level 1");
      level += 1;
      nextSequence();
    }
  });
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = colors[randomNumber];
  let counter = level;
  randomChosenColors.push(randomColor);
  playerChosenColors = [];


  if (level === 1) {
    blinkButton(randomColor);
    playAudio(randomColor);
  }
  else {
    setTimeout(function() {
      blinkButton(randomColor);
      playAudio(randomColor);
    }, 1000);
  }

  $(".btn").click(function() {
    if (counter > 0) {
      playAudio(this.id)
      playerChosenColors.push(this.id);
      console.log(playerChosenColors);
      console.log(randomChosenColors);
      pressedButton(this);
      counter--;
      checkAnswer();
    }

    if (counter === 0) {
      $("body").off("click", "btn");
    }
  })


}

function playAudio(audio) {
  let newAudio = new Audio("sounds/" + audio + ".mp3");
  console.log(newAudio);
  newAudio.play();
}

function blinkButton(button) {
  $("#" + button).fadeOut(100).fadeIn();
}

function checkAnswer() {
  if (randomChosenColors[playerChosenColors.length - 1] !== playerChosenColors[playerChosenColors.length - 1]) {
    gameOver();
  }
  if (randomChosenColors[randomChosenColors.length - 1]  == playerChosenColors[randomChosenColors.length - 1]) {
    level += 1;
    $("h1").text("Level " + level);
    nextSequence();
  }
}

function pressedButton(button) {
  $(button).addClass("pressed");
  setTimeout(function() {
    $(button).removeClass("pressed");
  }, 100);
}

function gameOver() {
  let counter = 1;
  playAudio("wrong")
  $("h1").text("Game over, press any key to restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $(document).keydown(function(){
    if (counter === 1) {
      $("h1").text("Level 1");
      level = 1;
      nextSequence();
      counter--;
    }
  })
}

startGame();


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function handler() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour);
});

var Start=false;
var level = 0;

$(document).keypress(function() {
  if (!Start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    Start=true;
  }
});

function checkAnswer(currentLevel) {
  var  i = gamePattern.pop();
  var  j = userClickedPattern.pop();
  if(i == j) {
    console.log("success");
    setTimeout(nextSequence(),1000);
  }
    else
      {console.log("wrong");
      var wrong =new Audio("sounds/wrong.mp3");
      wrong.play();

      $("body").addClass("game-over");
      setTimeout(function()
      {$("body").removeClass("game-over")},200);
      $("#level-title").text("Game Over,Press Any key to Restart");
      startover();
    }
}

function startover() {
  level =0;
  Start = false;
  gamePattern =[];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function nextSequence() {

  $("#level-title").text("level  "+level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
}

var level = 0;
var started = false;

var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  console.log(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(colour){
  var audio = new Audio("sounds/"+colour+".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
  },100)
}

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started = true
  }
})

function checkAnswer(currenLevel){
    if(userClickedPattern[currenLevel]===gamePattern[currenLevel]){
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
     else{
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
       $("body").addClass("game-over");
       setTimeout(function () {
         $("body").removeClass("game-over");
       }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
         startOver();
    }
}


function startOver(){
  level=0;
  gamePattern = [];
  started = false;
}


var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

//for game starting it executes if any key is pressed and it executes only once in a game.
$(document).on("keydown", function(){
  if(!started)
  {
    nextSequence();
    $("#level-title").text("Level "+level);
    started=true;
  }
});

//this stores the pattern of the user clicked colours.
$(".btn").on("click",function(){
  var userChoosenColour = $(this).attr("id");//this will get the id of the particular button that got clicked.
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000)
      }
    } else {
      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      startOver();
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

//this function generates random number.
function nextSequence(){

  //once the nextSequence is triggered, we empty the array user clicked pattern. Just so user click a new pattern.
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];//Storing that random colour with the help of random number.

  gamePattern.push(randomChosenColour);//adding the the random colour at the end of the array.


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);//This will flash the buttons randomly.

  playSound(randomChosenColour);

}

//This function will play the sound according to the colour detected. It will take colour name as input.
function playSound(name){

  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();

}

//This function will animate the button when pressed. It will take colour name as input.
function animatePress(currentColour){
  $("#"+currentColour).fadeOut(100).fadeIn(100);
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
};

//If the user gets the pattern wrong, Then the game will start over again from the beginning.
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

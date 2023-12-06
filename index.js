 
 var buttonColours=["red","blue", "green", "yellow"];
 var gamePattern = [];
 var userClickedPattern=[];
 var started = false;
 var level = 0;

 $(document).keypress(function(){
     $("body").removeClass("game-over");
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("h1").text("Level  " + level);
        nextSequence();
        started = true;
      }
});
 
 $(".btn").click(function(){
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
     }
     else {
        playSound("wrong");
       $("h1").text("GAME OVER!!, Press Any Key to Restart");
       $("body").addClass("game-over");
      //  setTimeout(function(){
      //   $("body").removeClass("game-over");
      //  },150);

       startOver();
      }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    
    $("h1").text("Level  "+ level);
    $("h2").text("Your Score: "+ (level-1)*5);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },100);
}

function startOver(){
  level=0;
  gamePattern=[];
  
  started=false;
}


//nextSequence();
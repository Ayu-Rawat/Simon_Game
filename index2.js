buttonColours=["red","green","blue","yellow"];


var gamePattern=[];
var userClickedColour=[];

var level=0;
var started=false;

var currentlevel=0; //created to check the usre input with game pattern on the go

// to start the game by clicking the start button 
$(".btn").click(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
      $(".btn").addClass("visibility");
    }
  });

// to start the game by pressing any key on keyboard

$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + level);
      $("h2").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

// function to create next sequence of the game if user input the correct sequence 

function nextSequence(){
    userClickedColour=[];
    ++level;
    $("h1").text("Level " + level);
    $("h2").text("Level " + level);
    var randomvariable=Math.floor(Math.random()*4);

    var randomchosencolor=buttonColours[randomvariable];
    gamePattern.push(randomchosencolor);

    audio(randomchosencolor);
    buttonanimation(randomchosencolor)
}

// function to add volume to button of simmon games 

function audio(name){
    var key=new Audio("sound/"+name+".mp3");
    key.play();
}

// function to add animation whenever we click simon game button 

function buttonanimation(currentkey){
    var button=document.querySelector("."+currentkey);
    button.classList.add("pressed");
    const myTimeout = setTimeout(removeclass, 100);
    function removeclass() {
      button.classList.remove("pressed");
    }
}

// adding a click function to buttons 

$(".bttn").click(function(){
    var userChosenColour=this.id;
    userClickedColour.push(userChosenColour);
    audio(userChosenColour);
    buttonanimation(userChosenColour);
    check();
})

// function to check if the user chosen colour match game pattern and to call next sequence

function check(){
    if (userClickedColour[currentlevel]===gamePattern[currentlevel]){
        ++currentlevel;
        if (userClickedColour.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
              currentlevel=0;
        }
    }else{
        gamePattern=[];
        startover();
    }
}

// function to start over if user input wrong colour 

function startover(){
    $("h1").text("Game Over, Press Any key To Restart ");
    $("h2").text("Game Over, Press Start To Restart ");
    $(".btn").removeClass("visibility");
    started=false;
    level=0;
    currentlevel=0;
    var gameoversound=new Audio("sound/wrong.mp3");
    gameoversound.play();
    gameoveranimation();
}

// game over animation

function gameoveranimation(){
    document.querySelector("html").classList.add("gameover");
    const myTimeout = setTimeout(removeclass, 150);
    function removeclass() {
      document.querySelector("html").classList.remove("gameover");
    }
}

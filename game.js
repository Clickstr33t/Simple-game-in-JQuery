var gamePattern =[];
var userClickedPattern =[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

if (!started){
    $("h1").on("mouseover",function(){
        $("h1").addClass("pressed");
    });
    $("h1").on("mouseout",function(){
        $("h1").removeClass("pressed");
    });
}

$("#red").click(function(){
    buttonClick("red");
});
$("#green").click(function(){
    buttonClick("green");
});
$("#blue").click(function(){
    buttonClick("blue");
});
$("#yellow").click(function(){
    buttonClick("yellow");
});


$("h1").click(function(){
   if (!started){
        nextSequence();
        started = true;
        
   }
});

$(document).keypress(function(){
    if (!started){
        nextSequence();
        started = true;
    }
    
});

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer (currentLevel){
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("succes")
        if (currentLevel === gamePattern.length-1){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
       $("h1").text("Restart");
       startOver();
    };
}

function animatedPress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    playSound(randomChosenColours);
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
}


function playSound(color){
    $("#"+color).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}

function buttonClick(color){
    playSound(color);
    var userChosenColour = color;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
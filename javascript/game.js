
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).on("keypress", startGame);

function startGame(event)
{
    var keypressed = event.key;
    if(!gameStarted && keypressed.toLowerCase() ==='a')
    {
        gameStarted = true;
        $(".btn").on("click", handleBtnClick);
        nextSequence();
    }
}

function nextSequence()
{
        $("#level-title").html("Level " + ++level);
        userClickedPattern = [];
        var randomNumber = (Math.floor((Math.random() * 4)));
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);   
        //console.log(gamePattern);
    
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        animatePress(randomChosenColour);
        playSound(randomChosenColour);   
}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        //console.info("SUCCESS");  

        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        //console.info("FAILED");
        playSound("wrong"); 
        $(document).addClass("game-over");
        setTimeout(function()
        {
            $("#level-title").html("Game Over !");
            
            $(document).removeClass("game-over");
        },200);
        resetGame();
       
    }


}

function resetGame()
{
    level = 0;
    gameStarted = false;
    gamePattern =[];
    userClickedPattern = [];
    $(".btn").off("click");
    setTimeout(function()
    {
        $("#level-title").html("Press A Key to Start");
    },2000)  
}

function handleBtnClick()
{
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function playSound(randomChosenColour)
{
    var sound = new Audio("static/sounds/" + randomChosenColour + ".mp3");
    sound.play();
}

function animatePress(randomChosenColour)
{
    $("#" +randomChosenColour).toggleClass("pressed");
    setTimeout(function()
    {
        $("#" +randomChosenColour).toggleClass("pressed");
    },100)  
}




//VARIABLES
//---------------------------------------------------------------

var wins = 0;
var losses = 0;
var randomValCry = 0;
var targetNumber = 0;
var counter = 0;

var crystalLink = [
    "assets/images/blue_stone.png",
    "assets/images/red_stone.png",
    "assets/images/purple_stone.png",
    "assets/images/yellow_stone.png"
]

//FUNCTIONS
//---------------------------------------------------------------

function randomGenCry () {
    randomValCry = Math.floor(Math.random() * 12) + 1;
    return randomValCry;
};

function randomGenTarget () {
    targetNumber = Math.floor(Math.random() * 102) + 19;
    $("#TargetScoreID").text(targetNumber);
};

function crystalGenerator () {
    for (var i=0; i<4;i++) {
        var crystalValue = randomGenCry();
        var imageCrystal = $("<img>");
        imageCrystal.addClass("crystal-image");
        imageCrystal.attr("src", crystalLink[i]);
        imageCrystal.attr("data-crystalvalue", crystalValue);
        $("#crystals").append(imageCrystal);
    };
};

function reset () {
    //Reset variables and clear old crystals
    counter = 0;
    $("#CounterID").text(counter);
    $("#crystals").empty();
    $("#GameOutcomeID").empty();

    //Next, generate new target score and display on DOM
    randomGenTarget();

    //Finally, re-generate Crystals
    crystalGenerator();
};

//MAIN PROGRAM
//---------------------------------------------------------------

//First, setup game by establishing target score and generating crystals
randomGenTarget();
crystalGenerator();

//Next, launch click counter and display progress
$(document).on("click", ".crystal-image", function() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    console.log(crystalValue);
    counter += crystalValue;
    $("#CounterID").text(counter);

    //Execute game progress condition
    if (counter==targetNumber) {
        $("#GameOutcomeID").text("You win!");
        var audiowon = new Audio('./assets/sounds/you-won.wav');
        audiowon.play();
        wins++;
        $("#WinsID").text(wins);
        var delay = setTimeout(reset, 3000);

    } else if (counter>=targetNumber) {
        $("#GameOutcomeID").text("You lose!");
        var audiolost = new Audio('./assets/sounds/game-over.wav');
        audiolost.play();
        losses++;
        $("#LossesID").text(losses);
        var delay = setTimeout(reset, 3000);
    };
});
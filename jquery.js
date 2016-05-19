var playing = false;
var score = 0;
var lives = 3;
var fruits = ["apple", "banana", "pear"];
var x;
var offset;
var fallspeed;
var action;

$(function() {
    $("#startbutton").click(function() {
        
        if(playing) {
            
            location.reload();
            
        } else {
            
            playing = true;
            score = 0;
            $(".scorer").html(score);
            $("#lives").css("visibility","visible");
            $("#gameover").css("visibility", "hidden");
            
            lives = 3;
            addHearts(lives);
            $("#start").html("Reset");
            startGame();
            
        }
    });


    $("#fruit1").mouseover(function() {
        
        score++;
        $(".scorer").html(score);
        
        $("#slicesound")[0].play();
        
        stopAction();
        
        $("#fruit1").hide("explode", 500);
        
        setTimeout(startGame, 710);
        
        $("#fruit1").css("cursor","crosshair");
        
    });
    
    function addHearts(lives) {
        $("#lives").empty();

        for(i=0; i<lives; i++){
                    $("#lives").append("<img src='images/heart.png' class='life'>");
                };
    };

    function startGame() {

        $("#fruit1").show();
        chooseFruit();
        offset = Math.round(80*Math.random());
        $("#fruit1").css({'left': offset +"%", 'top':"-20%"});

        fallspeed = Math.round(2*Math.random()) + 3;

        action = setInterval(function() {
            $("#fruit1").css('top', $("#fruit1").position().top + fallspeed);

            if($("#fruit1").position().top > $("#gameboard").height()) {
                if(lives>1) {
                    lives--;

                    $("#fruit1").show();
                    chooseFruit();
        offset = Math.round(80*Math.random());
        $("#fruit1").css({'left': offset +"%", 'top':"-20%"});

                    fallspeed = Math.round(2*Math.random()) + 3;

                    addHearts(lives);
                } else{//game over
                    lives--;
                    addHearts(lives);
                    $("#gameover").css("visibility", "visible");
                    playing = false;
                    $("#start").html("Try Again");
                    
                    
                    stopAction();
                }
            } else {

            }
        }, 10)
    }

    function chooseFruit() {
        x = Math.round(2*Math.random());
        $("#fruit1").attr('src', 'images/' +fruits[x]+'.png')
    }

    function stopAction() {
        clearInterval(action);
    }
    
});    
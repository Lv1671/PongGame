alert("Start your game");
let x = true;
let y = true;

let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let boardBounds = board.getBoundingClientRect();
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let leftPlayerLives =  3;
let rightPlayerLives = 3;

//USER INPUT LISTEN
document.addEventListener("keydown", function(e){
    if(e.key == "w"){
movePaddle(leftPaddle,-window.innerHeight * 0.1);
    }else if(e.key == "s"){
movePaddle(leftPaddle,window.innerHeight * 0.1);
    }else if(e.key =="ArrowUp"){
movePaddle(rightPaddle,-window.innerHeight * 0.1);
    }else if(e.key == "ArrowDown"){
movePaddle(rightPaddle,window.innerHeight * 0.1);
    }
})
function setColor(idx){
   let allicons = document.querySelectorAll(".material-icons");
   allicons[idx].style.color = "#c23616";
}
function movePaddle(cPaddle, change){
    let cPaddleBounds = cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top + change >= boardBounds.top && cPaddleBounds.bottom + change <= boardBounds.bottom){
        cPaddle.style.top = cPaddleBounds.top+change+"px";
    }
}


function moveBall(){
  
    let ballCord = ball.getBoundingClientRect();
    let ballTop =  ballCord.top;
    let ballLeft = ballCord.left;
    let ballBottom = ballCord.bottom;
    let ballRight = ballCord.right;

    //IS BALL IN BOUND
    //HANDLE VERTICAL BOUND

    //CHECK IF COLLIDED WITH ANY PLAYERS HORIZONTAL BOUNDARY
    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;
    if(hasTouchedLeft ||hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives == 0){
                alert("GameOver Player B is won");
                document.location.reload();
            }else{
               return resetgame();
            }
        }else{
            rightPlayerLives--;
            setColor(3 + rightPlayerLives);

            if(rightPlayerLives == 0){
                alert("GameOver Player A is won");
               document.location.reload();
            }
            else
            return resetgame();
        }
    }
    function resetgame(){
        ball.style.top = window.innerHeight* 0.45  + "px";
        ball.style.left = window.innerWidth * 0.45 + "px";
        requestAnimationFrame(moveBall);
    }


        if(ballTop <= boardBounds.top || ballBottom >= boardBounds.bottom){
        //VERTICALLY OUTSIDE
        y=!y;
    }
  // if(ballLeft <= boardBounds.left || ballRight >= boardBounds.right){
        //HORIZONTALLY OUTSIDE
    //   x=!x;
    //}

    //******************** Collision ***********************
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballLeft <= leftPaddleBounds.right && ballRight >= leftPaddleBounds.left &&ballTop + 30 >= leftPaddleBounds.top && ballBottom - 30 <= rightPaddleBounds.bottom){
        x=!x;
    } 
    if(ballLeft <= rightPaddleBounds.right && ballRight >= rightPaddleBounds.left &&ballTop + 30 >= rightPaddleBounds.top && ballBottom - 30 <= rightPaddleBounds.bottom){
        x=!x;
    } 


    ball.style.top =  y==true ? ballTop+4+"px" :ballTop-4+"px";
    ball.style.left = x==true ? ballLeft+4+"px":ballLeft-4+"px";
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
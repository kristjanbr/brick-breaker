function drawIt() {
  function init() {
      ctx = $('#canvas')[0].getContext("2d");
      WIDTH = $("#canvas").width();
      HEIGHT = $("#canvas").height();
      callIt();

      
  }


  var call_timer; // current timeout id to clear
  function callIt() {
    draw();
    call_timer = setTimeout(callIt, 10); // do not touch 
  };


  function init_paddle() {
      paddlex = WIDTH / 4;
      paddleh = 15;
      paddlew = 75;
  }
  function init_paddle2() {
    paddlex2 = WIDTH-WIDTH / 4;
    paddleh2 = 15;
    paddlew2 = 75;
}

  function init_mouse() {
      //canvasMinX = $("#canvas").offset().left;
      canvasMinX = $("canvas").offset().left + paddlew / 2;
      canvasMaxX = canvasMinX + WIDTH - paddlew;
  }

  function initbricks() { //inicializacija opek - polnjenje v tabelo
      NROWS = 6;
      NCOLS = 7;
      BRICKWIDTH = (WIDTH / NCOLS) - 1;
      BRICKHEIGHT = 20;
      PADDING = 1;
      /*bricks = new Array(NROWS);
      for (i = 0; i < NROWS; i++) {
          bricks[i] = new Array(NCOLS);
          for (j = 0; j < NCOLS; j++) {
              bricks[i][j] = 1;
          }
      }*/
      bricks=[
      [0,0,0,0,0,0,0],
      [3,3,3,3,3,3,3],
      [2,2,2,2,2,2,2],
      [1,1,1,2,2,1,1],
      [1,1,1,1,1,1,1],
      [0,0,1,3,1,0,0]];
  }

  var x = 200;
  var y = 200;
  var dx = 3;
  var dy = 5;
  var ctx;
  var r = 10;
  var WIDTH;
  var HEIGHT;
  var c = "0,0,0"
  var paddlex;
  var paddleh;
  var paddlew;
  var paddlex2;
  var paddleh2;
  var paddlew2;
  var rightDownRight = false;
  var leftDownRight = false;
  var rightDownLeft = false;
  var leftDownLeft = false;
  var canvasMinX;
  var canvasMaxX;
  var bricks;
  var NROWS;
  var NCOLS;
  var BRICKWIDTH;
  var BRICKHEIGHT;
  var PADDING;
  var currColor1="#4bcffa";
  var currColor2="#ff3f34"
  var timeout=8000;
  var once=false;

  function initMusic(){
    var audio_file = new Audio('../mus/mario.mp3')
    audio_file.addEventListener('timeupdate', function(){
        var buffer = .29
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 24
            this.play()
        }
    });
    audio_file.play();
  }

  function circle(x, y, r, c) {
      ctx.beginPath();
      ctx.fillStyle="linear-gradient(to bottom left, #7d0140 , #120147)";
      var my_gradient = ctx.createLinearGradient(300, 0, 0, 150);
        my_gradient.addColorStop(0, "#440122");
        my_gradient.addColorStop(1, "#0c002c");
        ctx.fillStyle = my_gradient
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
  }

  function rect(x, y, w, h,c) {
      ctx.beginPath();
      ctx.fillStyle = c;
      ctx.rect(x, y, w, h);
      ctx.closePath();
      ctx.fill();
  }

  function clear() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  //END LIBRARY CODE
  function draw() {
      clear();
      circle(x, y, 10, c);
      //premik ploščice levo in desno
      if (rightDownLeft) {
          if ((paddlex + paddlew) < WIDTH/2) {
              paddlex += 5;
          } else {
              paddlex = (WIDTH - paddlew*2)/2;
          }
      } else if (leftDownLeft) {
          if (paddlex > 0) {
              paddlex -= 5;
          } else {
              paddlex = 0;
          }
      }

      if (leftDownRight) {
        if ((paddlex2 + paddlew2) < WIDTH) {
            paddlex2 += 5;
        } else {
            paddlex2 = WIDTH - paddlew;
        }
    } else if (rightDownRight) {
        if (paddlex2 > WIDTH/2) {
            paddlex2 -= 5;
        } else {
            paddlex2 = WIDTH/2;
        }
    }




      rect(paddlex, HEIGHT - paddleh, paddlew, paddleh,currColor1);
      rect(paddlex2, HEIGHT - paddleh2, paddlew2, paddleh2,currColor2);

      //riši opeke
      for (i = 0; i < NROWS; i++) {
          for (j = 0; j < NCOLS; j++) {
              if (bricks[i][j] >0) {
                  rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                      (i * (BRICKHEIGHT + PADDING)) + PADDING,
                      BRICKWIDTH, BRICKHEIGHT,farba(i,j));
                
              }
          }
      }


      rowheight = BRICKHEIGHT + PADDING + BRICKHEIGHT/8; //Smo zadeli opeko?
      colwidth = BRICKWIDTH + PADDING + BRICKHEIGHT/8;
      row = Math.floor(y / rowheight);
      col = Math.floor(x / colwidth);
      //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
      if (y < NROWS * rowheight && row >= 0 && col >= 0 && (theBricks(row,col)|| theBricks(row+1,col))) {
          dy = -dy;
          //bricks[row][col] = 0;
      }
      if (x + dx > WIDTH - r || x + dx < 0 + r) {
          dx = -dx;
      }
      if (y + dy < 0 + r) {
          dy = -dy;
      } else if (y + dy + paddleh > HEIGHT - r) {
          if (x > paddlex && x < paddlex + paddlew) {
              dx = 6 * ((x - (paddlex + paddlew / 2)) / paddlew);
              dy = -dy;
          } else if (y + dy > HEIGHT - r){console.log("END OF GAME, YOU LOSE!")}
              //clearInterval(ne);

          if (x > paddlex2 && x < paddlex2 + paddlew2) {
                dx = 6 * ((x - (paddlex2 + paddlew2 / 2)) / paddlew2);
                dy = -dy;
            } else if (y + dy > HEIGHT - r){console.log("END OF GAME, YOU LOSE!")}
                //clearInterval(ne);
      }
      x += dx;
      y += dy;

  }
  function farba(row,col){
    var num = bricks[row][col];
    switch (num) {
        case 3:
			return "#e74c3c";
        case 2:
            return "#e67e22";
        default:
            return "#1abc9c"
    }
  }
  function theBricks(row,col){
    if (row>NROWS-1)
    return false;
  if (col>NCOLS-1)
    return false;

    var num = bricks[row][col];
    
    switch (num) {
        case 3:
        case 2:
        case 1:
            bricks[row][col]=bricks[row][col]-1;
            console.log(bricks[row][col]);
            return true;
        default:
            return false;
    }

  }

  //nastavljanje leve in desne tipke
  function onKeyDown(evt) {
    if (evt.keyCode == dKey)//d -68
        rightDownLeft = true;
    else if (evt.keyCode == aKey)//a -65
        leftDownLeft = true;

      if (evt.keyCode == rKey)//-> -37
          rightDownRight = true;
      else if (evt.keyCode == lKey)//<- -39
          leftDownRight = true;
  }

  function onKeyUp(evt) {
    if (evt.keyCode == dKey)
        rightDownLeft = false;
    else if (evt.keyCode == aKey)
        leftDownLeft = false;

      if (evt.keyCode == rKey)
          rightDownRight = false;
      else if (evt.keyCode == lKey)
          leftDownRight = false;
  }

  /*function onMouseMove(evt) {
      if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
          paddlex = evt.pageX - canvasMinX;
      }
  }*/
  //$(document).mousemove(onMouseMove);
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  var rKey=68;
  var lKey=65;
  var dKey=37;
  var aKey=39;

  init();
  init_paddle();
  init_paddle2();
  //init_mouse();
  initbricks();
  initMusic();
  switchInput();


  var timer; // current timeout id to clear
  function switchInput() {
    if(once)
        timeout=4000;
    else
        once=true;
    swap();
      timer = setTimeout(switchInput, timeout);
  };
  

  f/*unction switchInput(){
    if(once)
        timeout=4000;
    else
        once=true;
    return setInterval(swap, timeout);
  }*/
  function swap(){
    rightDownLeft = false;
    leftDownLeft = false;
    rightDownRight = false;
    leftDownRight = false;
    if(dKey!=68){
        dKey=68;
        aKey=65;
        rKey=37;
        lKey=39;
        currColor1="#4bcffa";
        currColor2="#ff3f34"
    }
    else{
        dKey=39;
        aKey=37;
        rKey=65;
        lKey=68;
        currColor2="#4bcffa";
        currColor1="#ff3f34"
    }
  }


}
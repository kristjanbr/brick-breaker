var yourName = "";
function drawIt() {

    function init() {
        document.getElementById("whatTime").innerHTML = "00:00";
        intTimer = setInterval(timer, 1000);
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        $("#scorePoints").html(tocke);
        document.getElementById("btn").disabled = true;
        document.getElementById("top").style.opacity = 0;
        document.getElementById("diff").innerHTML = "Hard";


        NROWS = 6;
        NCOLS = 7;
        BRICKWIDTH = (WIDTH / NCOLS) - 1;
        BRICKHEIGHT = 20;
        PADDING = 1;

        bricks2 = [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 3, 1, 1, 1],
            [2, 1, 0, 0, 0, 1, 2],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]

        ];


        callIt();
    }

    function timer() {
        if (start) {
            sekunde++;
            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;
            $("#whatTime").html(izpisTimer);
        }

        else {
            sekunde = 0;
            izpisTimer = "00:00";
            $("#whatTime").html(izpisTimer);
        }
    }

    var call_timer;
    function callIt() {
        draw();
        call_timer = setTimeout(callIt, 10);
    };


    function init_paddle() {
        paddlex = WIDTH / 8;
        paddleh = 15;
        paddlew = 75;
    }
    function init_paddle2() {
        paddlex2 = WIDTH - WIDTH / 4;
        paddleh2 = 15;
        paddlew2 = 75;
    }

    function init_mouse() {
        //canvasMinX = $("#canvas").offset().left;
        canvasMinX = $("canvas").offset().left + paddlew / 2;
        canvasMaxX = canvasMinX + WIDTH - paddlew;
    }

    function initbricks() { //inicializacija opek - polnjenje v tabelo

    }

    var currLevel = 1;
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
    var bricks2;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
    var currColor1 = "#4bcffa";
    var currColor2 = "#ff3f34"
    var timeout = 8000;
    var once = false;
    var tocke = 0;
    var sekundeI;
    var minuteI;
    var intTimer;
    var izpisTimer;
    var sekunde = 0;
    var izpisTimer = "00:00";
    var start = true;
    var only = false;
    var my_gradient;

    function initMusic() {
        var audio_file = new Audio('mus/mario.mp3')
        audio_file.addEventListener('timeupdate', function () {
            var buffer = .29
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 24
                this.play()
                timeout -= 150;
                once = false;
            }
        });
        audio_file.play();
    }

    function circle(x, y, r, c) {
        ctx.beginPath();
        my_gradient = ctx.createLinearGradient(250, 300, 350, 300);
        my_gradient.addColorStop(0, currColor1);
        my_gradient.addColorStop(1, currColor2);
        ctx.fillStyle = my_gradient;
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    function isEmpty() {
        for (i = 0; i < bricks2.length; i++) {
            for (j = 0; j < bricks2[i].length; j++) {
                if (bricks2[i][j] != 0)
                    return false
            }
        }
        return true; //tabela je prazna, ni opek
    }

    function draw() {
        if (isEmpty()) {
            currLevel++;
            console.log(currLevel)
            if (currLevel == 2) {
                document.getElementById("diff").innerHTML = "Harder";
                bricks2 = [
                    [2, 2, 2, 2, 2, 2, 2],
                    [1, 2, 2, 2, 2, 2, 1],
                    [0, 1, 1, 2, 1, 1, 0],
                    [0, 0, 2, 1, 2, 0, 0],
                    [0, 0, 0, 3, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0]];

            }
            else if (currLevel == 3) {
                document.getElementById("diff").innerHTML = "Extreme";
                bricks2 = [
                    [3, 2, 2, 3, 2, 2, 3],
                    [2, 3, 3, 2, 3, 3, 2],
                    [1, 2, 2, 2, 2, 2, 1],
                    [0, 1, 2, 2, 2, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [3, 0, 0, 0, 0, 0, 3]];

            }
            else {
                only = true;
                gameOver();
            }
            x = 200;
            y = 200;
            dy = 5
            dx = 2;
        };
        clear();
        circle(x, y, 10, c);
        //premik ploščice levo in desno
        if (rightDownLeft) {
            if ((paddlex + paddlew) < WIDTH / 2) {
                paddlex += 5;
            } else {
                paddlex = (WIDTH - paddlew * 2) / 2;
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
            if (paddlex2 > WIDTH / 2) {
                paddlex2 -= 5;
            } else {
                paddlex2 = WIDTH / 2;
            }
        }




        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh, currColor1);
        rect(paddlex2, HEIGHT - paddleh2, paddlew2, paddleh2, currColor2);

        //riši opeke
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks2[i][j] > 0) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT, farba(i, j));

                }
            }
        }


        rowheight = BRICKHEIGHT + PADDING + BRICKHEIGHT / 8; //Smo zadeli opeko?
        colwidth = BRICKWIDTH + PADDING + BRICKHEIGHT / 8;
        row = Math.floor(y / rowheight);
        col = Math.floor(x / colwidth);
        //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && (theBricks(row, col) || theBricks(row + 1, col))) {
            dy = -dy;
            tocke += 10;
            $("#scorePoints").html(tocke);
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
                //start = true;
            } else if (y + dy > HEIGHT - r) {
                //END OF GAME
                start = false;
            }
            //clearInterval(ne);

            if (x > paddlex2 && x < paddlex2 + paddlew2) {
                dx = 6 * ((x - (paddlex2 + paddlew2 / 2)) / paddlew2);
                dy = -dy;
                //start = true;
            } else if (y + dy > HEIGHT - r) {
                //END OF GAME
                start = false;
            }
            //clearInterval(ne);
        }
        x += dx;
        y += dy;
        if (!start && !only) {
            only = true;
            gameOver("lost");
        }

    }
    function gameOver(str) {
        start = true;
        var finalScore = tocke - sekunde;
        var sc = new Array(5);
        sc[0] = parseInt(localStorage.getItem("sc1"));
        sc[1] = parseInt(localStorage.getItem("sc2"));
        sc[2] = parseInt(localStorage.getItem("sc3"));
        sc[3] = parseInt(localStorage.getItem("sc4"));
        sc[4] = parseInt(localStorage.getItem("sc5"));
        var nu = new Array(5);
        nu[0] = localStorage.getItem("nu1");
        nu[1] = localStorage.getItem("nu2");
        nu[2] = localStorage.getItem("nu3");
        nu[3] = localStorage.getItem("nu4");
        nu[4] = localStorage.getItem("nu5");
        if (finalScore>sc[4]){
            sc[4]=finalScore;
            nu[4]=yourName;
            urejenjeMaxMin(sc,nu);
            localStorage.setItem("sc1", sc[0]);
            localStorage.setItem("sc2", sc[1]);
            localStorage.setItem("sc3", sc[2]);
            localStorage.setItem("sc4", sc[3]);
            localStorage.setItem("sc5", sc[4]);
            localStorage.setItem("nu1", nu[0]);
            localStorage.setItem("nu2", nu[1]);
            localStorage.setItem("nu3", nu[2]);
            localStorage.setItem("nu4", nu[3]);
            localStorage.setItem("nu5", nu[4]);
        }
        if (str == "lost")
            done();
        else
            won();
    }

    function urejenjeMaxMin(a,b) {//Element a[](int)  //Element b[](String)
        var i, j;
        var x; // Element x - int
        var y; // Element y - String (side)
        for (i = 1; i < a.length; i++) {
            if (a[i] < a[i - 1]) 
                continue;
            x = a[i];
            y = b[i];
            j = i - 1;
            while (j >= 0 && x > (a[j])) {
                a[j + 1] = a[j];
                b[j + 1] = b[j];
                j--;
            }
            a[j + 1] = x;
            b[j + 1] = y;
        }
    }


    function farba(row, col) {
        var num = bricks2[row][col];
        switch (num) {
            case 3:
                return "#b80141";
            case 2:
                return "#0b0146";
            default:
                return "#fff6fe"
        }
    }
    function theBricks(row, col) {
        if (row > NROWS - 1)
            return false;
        if (col > NCOLS - 1)
            return false;

        var num = bricks2[row][col];

        switch (num) {
            case 3:
            case 2:
            case 1:
                bricks2[row][col] = bricks2[row][col] - 1;
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

    var rKey = 68;
    var lKey = 65;
    var dKey = 37;
    var aKey = 39;

    init();
    //initbricks();
    init_paddle();
    init_paddle2();
    //init_mouse();
    initMusic();
    switchInput();


    var timer; // current timeout id to clear
    function switchInput() {
        if (once)
            timeout = 4000;
        else
            once = true;
        swap();
        timer = setTimeout(switchInput, timeout);
    };

    function swap() {
        rightDownLeft = false;
        leftDownLeft = false;
        rightDownRight = false;
        leftDownRight = false;
        if (dKey != 68) {
            dKey = 68;
            aKey = 65;
            rKey = 37;
            lKey = 39;
            currColor1 = "#4bcffa";
            currColor2 = "#ff3f34";
            document.getElementById("desnaSlika").src = "img/dlPurple.png";
            document.getElementById("levaSlika").src = "img/adBlue.png";
            document.getElementById("swit").style.color = "#4bcffa";
            document.getElementById("ching").style.color = "#ff3f34";
        }
        else {
            dKey = 39;
            aKey = 37;
            rKey = 65;
            lKey = 68;
            currColor2 = "#4bcffa";
            currColor1 = "#ff3f34";
            document.getElementById("levaSlika").src = "img/dlBlue.png";
            document.getElementById("desnaSlika").src = "img/adPurple.png";
            document.getElementById("ching").style.color = "#4bcffa";
            document.getElementById("swit").style.color = "#ff3f34";
        }
    }


}

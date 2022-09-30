var w = 260;
var h = 400;
var score = 0;
var div = document.getElementById("score");

function Rect(y, arr) {
    //每一个rect表示一行
    //y表示这一行的高度
    this.y = y;
    //arr是一个数组，用于描述，四个小矩形，每一个的颜色
    //颜色：0表示白，2表示黑，1表示红，3表示灰，大于3也是灰
    this.arr = arr;
}

var game = document.getElementById("game");
var canvas = game.getContext("2d");
game.width = w;
game.height = h;

canvas.fillStyle = "#000000";
//a里面放入6个Rect
var a = new Array();
for (var i = 0; i < 6; i++) {
    //每一个Rect里面要有一个y，一个arr
    var arr = new Array();
    for (var j = 0; j < 4; j++) {
        arr[j] = 0;
    }
    //应该随机一个让它是黑色
    var n = Math.floor(Math.random() * 4);
    arr[n] = 2;
    a[i] = new Rect(i * 100 - 200, arr);
}


var backing = null;
var backsum = 0;
//回退的方法
// function goBack() {
//     if (backsum == h / 4) {
//         //停止回退
//         clearInterval(backing);
//     }
//     for (var i = 0; i < a.length; i++) {
//         a[i].y--;
//     }
//     drawGame();
//     backsum++;
// }

//能动的方法
function goGame() {
    drawGame();
    for (var i = 0; i < a.length; i++) {
        a[i].y++;
        if (a[i].y > h) {
            // for (var j = 0; j < a[i].arr.length; j++) {
            //     if (a[i].arr[j] == 2) {
            //         //gameover
            //         isrunning = false;
            //         clearInterval(running);
            //         a[i].arr[j] = 1;
            //         //回退
            //         // backing = setInterval("goBack();", 10);
            //         // return;
            //     }

            // }

            //出去了，就再利用
            for (var j = 0; j < a[i].arr.length; j++) {
                a[i].arr[j] = 0;

            }
            var n = Math.floor(Math.random() * 4);
            a[i].arr[n] = 2;
            //放到最上面去
            a[i].y -= h / 4 * 6;
            // 所以不一定最下面的一行是a[5]
            // 而是a[5]到最下面了，就修改y让他到上面去
        }


    }


}
//绘制的方法

function drawGame() {
    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < a[i].arr.length; j++) {
            //颜色是什么？
            switch (a[i].arr[j]) {
                case 0:
                    canvas.fillStyle = "#ffffff";
                    break;
                case 1:
                    canvas.fillStyle = "#ff0000";
                    break;
                case 2:
                    canvas.fillStyle = "#000000";
                    break;
                case 3:
                    canvas.fillStyle = "#dddddd";
                    break;
                default:
                    canvas.fillStyle = "#dddddd";
            }
            //画
            canvas.fillRect(j * (w / 4), a[i].y, (w / 4), (h / 4));
            //描边
            canvas.strokeStyle = "#666666";
            canvas.strokeRect(j * (w / 4), a[i].y, (w / 4), (h / 4));


        }


    }
    canvas.strokeStyle = "#000000";
    canvas.strokeRect(0, 0, w, h);


}


function move()
{   
    /*
    最满意的一段代码，想了好久，最后实现了
    这里不能换y！！！
    本质就是把下一行的数据换成上一行的，实现下落的效果
    换了y等于啥也没动
    */
    // let p = a[5].y;
    // let t = a[5].arr;
    for (let i=5;i>=1;i--)  // 倒着来
    {
        // a[i].y = a[i-1].y;
        a[i].arr = a[i-1].arr;

    }
    // 一开始我想直接把a[5]赋给a[0]
    // 但后来发现会重复，a[0]要重现初始化
    let p =a[0].y;
    var arr = new Array();
    for (var j = 0; j < 4; j++) {
        arr[j] = 0;
    }
    var n = Math.floor(Math.random() * 4);
    arr[n] = 2;
    a[0]  = new Rect(p,arr);
    // a[0].arr = t;
}

var begin = true;
function onGamedown(event) {
    if (isrunning) {
        event = event || window.event;
        var x = event.clientX - 200;
        var y = event.clientY - 100;

        //判断点击的是哪个矩形
        for (var i = 0; i < a.length; i++) {
            if (a[i].y < y && a[i].y + h / 4 > y) {
                //点击在了第i行
                var j = Math.floor(x / (w / 4));
                //将上面取整的数加1
                a[i].arr[j]++;

                if (a[i].arr[j] == 1) {
                    drawGame();
                    clearInterval(running);
                    isrunning = false;
                    alert("点错啦！");
                    return;
                } else if (a[i].arr[j] == 3) {
                    score++;
                    a[i].arr[j] = 2;    // 关键代码！不然一轮完就变会=灰了
                    move();
                    drawGame();
                    div.innerHTML = "得分：" + score;
                    
                }


            }


        }
    }


}
var isrunning = true;
var running = null;
drawGame();
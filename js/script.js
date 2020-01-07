var
    canv = document.getElementById("canvas"),
    ctx = canv.getContext("2d"),
    isMousDown = false,
    coords=[],
    rrad=5
;
canv.width = window.innerWidth;/*найти*/
canv.height = window.innerHeight;/*найти*/
// ctx.fillStyle='magenta';
var x=50;/*git */

// ctx.fillRect(x,50,300,200);
// незакрашенный
// ctx.lineWidth = 10;
// ctx.strokeStyle='red';
// ctx.strokeRect(x,50,300,200);

//круг
//  ctx.arc(canv.width/2,canv.height/2,100,0,Math.PI*2,false)
// ctx.fill();

// трехугольник
// ctx.scale(2,2)/*увеличение в 2 раза по каждой из осей*/
// ctx.rotate(
//     // .1/*повернет правее*/
//     // -.1/*повернет левее*/
//     10*Math.PI/180/*повернет на 10*/
// );/*пофорот фигуры*/
//
// ctx.beginPath();
// ctx.moveTo(50,50);
// ctx.lineTo(25,100);
// ctx.lineTo(75,100);
// ctx.closePath();/*завершает фигуру*/
// ctx.stroke();

//текст


//цвет градиента

// var grad=ctx.createLinearGradient(0,0,500,500);
// grad.addColorStop('0','magenta');
// grad.addColorStop('.50','blue');
// grad.addColorStop('1','red');
// ctx.fillStyle=grad;
// ctx.font = '40px Georgia';
// ctx.textAlign = "center"
// ctx.fillText('Привет, мой друг!))',canv.width/2, 100);


//пример анимации лучше делать через реквест анимейшн фрейм
// setInterval(function () {
//     ctx.fillStyle = 'white';
//
//
//     ctx.fillRect(0,0,canv.width,canv.height);
//     ctx.fillStyle='magenta';
//
//     ctx.fillRect(x++,50,300,200);
//
// },333)

//создаем события кликов мышки
canv.addEventListener("mousedown",function () {
    isMousDown = true;
})
canv.addEventListener("mouseup",function () {
    isMousDown = false;
    ctx.beginPath();
    coords.push('mouseup');/*не повторяет опущенную клавишу*/
})

//рисует кружок при нажатии мышкой mousedown,mousemove
canv.addEventListener("mousemove", function (e) {
    ctx.fillStyle='black';
ctx.strokeStyle='black';
if (isMousDown){
    coords.push([e.clientX,e.clientY]);/*запоминаем координаты*/
    //рисуем линиями чтоб не было пробелов
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    ctx.beginPath();/*не заполняет между кружками*/
    ctx.arc(e.clientX,e.clientY,rrad,0,Math.PI*2);
    ctx.fill();

    ctx.beginPath();/*не заполняет между кружками*/
    ctx.lineWidth=rrad*2;

    ctx.moveTo(e.clientX,e.clientY);
}

});
function clear(){
    ctx.fillStyle ='white';
    ctx.fillRect(0,0,canv.width,canv.height);
    ctx.beginPath();
    ctx.fillStyle='black';
    ctx.strokeStyle='black';


};
function save(){
    localStorage.setItem("coords", JSON.stringify(coords));/****************/
};
function replay(){
    var timer = setInterval(function (e) {
        if (!coords.length){
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        var crd = coords.shift(),/**********/
            e={
                clientX:crd["0"],
                clientY:crd["1"]
    };
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
        ctx.beginPath();/*не заполняет между кружками*/
        ctx.arc(e.clientX,e.clientY,rrad,0,Math.PI*2);
        ctx.fill();

        ctx.beginPath();/*не заполняет между кружками*/
        ctx.lineWidth=rrad*2;

        ctx.moveTo(e.clientX,e.clientY);
    },3);
}
document.addEventListener("keydown",function (e) {
    console.log(e.keyCode);/*узнать код клавиши*/
    if (e.keyCode==83){
        save();
        console.log("Saved");
    }

    if (e.keyCode==82){

        console.log("Replaying ...");
        coords = JSON.parse(localStorage.getItem('coords'));/**************/
        clear();
        replay()

    }
    if (e.keyCode==67){

        clear();
        console.log("Cleared");
    }

});


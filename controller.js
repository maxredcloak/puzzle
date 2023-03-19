// Obtener el elemento canvas del DOM
const canvas = document.getElementById("controller");
const ctx = canvas.getContext("2d");

const xc = document.getElementById("x");
const yc = document.getElementById("y");
const action = document.getElementById("action");

// Dibujar la cruceta
var xmove = 200;
var ymove = 200;
var sizemove = 120
var activex = undefined;
var activey = undefined;
var firstx = undefined;
var firsty = undefined;
var b1x = 500
var b1y = 200

canvas.addEventListener('touchstart', function(e) {
  var touch = getcoords(e);
  setActiveMovement(touch);
  setActiveButtons(touch);
});

canvas.addEventListener('touchmove', function(e) {
  action.innerHTML ="";
  var touch = getcoords(e);
  if(activex || activey){
    if(touch.x > xmove + sizemove){
      touch.x = xmove + sizemove -1;
    }
    else if(touch.x < xmove){
      touch.x = xmove + 1;
    }
     if(touch.y > ymove + sizemove){
      touch.y = ymove + sizemove -1;
    }
    else if(touch.y < ymove){
      touch.y = ymove + 1;
    }
    activex = touch.x - sizemove/2;
    activey = touch.y - sizemove/2;
  }
});

canvas.addEventListener('touchend', function(e) {
  activex = undefined;
  activey = undefined;
  firstx = undefined;
  firsty = undefined;
  xmove=200;
  ymove=200;
  action.innerHTML ="";
});

function setActiveMovement(touch){
  if(touch.x > xmove 
    && touch.x < xmove + sizemove
    && touch.y > ymove
    && touch.y < ymove + sizemove
  ){
    activex = touch.x - sizemove/2;
    activey = touch.y - sizemove/2;
    firstx = activex;
    firsty = activey;
    xmove = activex;
    ymove = activey;
  }
}
function setActiveButtons(touch){
  if(touch.x > b1x 
    && touch.x < b1x + sizemove
    && touch.y > b1y
    && touch.y < b1y + sizemove
  ){
    action.innerHTML = "1";
  }else{
    action.innerHTML = "";
  }
}

function getcoords(e){
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;
  return {x: touchX, y: touchY}
}

function drawSquare(ctx,x,y,size, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function update(){}

function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawSquare(ctx,xmove, ymove, sizemove,"#8B8B8B");
  if(activex && activey){
  drawSquare(ctx,activex, activey, sizemove,"#d0d0d0");
  }
  drawSquare(ctx,b1x, b1y, sizemove,"#8B8B8B");
}

function getDirection(){
  if(activex && activey){
    xc.innerHTML = activex - firstx;
    yc.innerHTML = activey - firsty;
  }else{
    xc.innerHTML = "";
    yc.innerHTML = "";
  }
}

function loop() {
  update();
  render();
  getDirection()
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
import { Cube } from './cube.js';
import { Room } from './room.js';
import { GrayCube } from './graycube.js';
import { BlackCube } from './blackcube.js';

// Obtener el elemento canvas y el contexto de dibujo
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var room = new Room(600,600,ctx);
var myCube = new Cube(200, 200, 60);

//El orden en el listado influye en su orden de renderizado
room.add(new BlackCube(100, 100, 100, 'black'));
room.add(new GrayCube(300, 300, 60));
room.add(myCube);

canvas.width = room.width;
canvas.height = room.height;

canvas.addEventListener('touchstart', function(e) {
  var touch = getcoords(e);
  var finded = false;
  room.getElements().forEach(e =>{
    if (touch.x > e.x && touch.x < e.x + e.size &&
      touch.y > e.y && touch.y < e.y + e.size) {
        finded = true;
        e.onClick(touch.x,touch.y);
    }
  });
  if(!finded){
    myCube.onClick(touch.x,touch.y);
  }
});

var touching = undefined;

canvas.addEventListener('touchmove', function(e) {
  var touch = getcoords(e);
  if(touching){
    touching.onDrag(touch.x,touch.y);
  }else{
    room.getElements().forEach(e =>{
      if (!touching && touch.y > e.x && touch.x < e.x + e.size &&
        touch.y > e.y && touch.y < e.y + e.size && e.isDragable) {
        touching = e;
        touching.onDrag(touch.x,touch.y);
      }
    });
  }
})

canvas.addEventListener('touchend',function(e){
  touching = undefined;
})

function getcoords(e){
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;
  return {x: touchX, y: touchY}
}

function loop() {
  room.getElements().forEach(e => {
    e.update(room);
  });
  room.draw();
  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);

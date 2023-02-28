import { Cube } from './cubes/cube.js';
import { Room } from './rooms/room.js';
import { GrayCube } from './cubes/graycube.js';
import { BlackCube } from './cubes/blackcube.js';
import { build } from './rooms/level1.js';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var room = build(ctx);

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
    room.getPlayer().onClick(touch.x,touch.y);
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

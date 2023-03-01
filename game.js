import { Cube } from './cubes/cube.js';
import { Room } from './rooms/room.js';
import { GrayCube } from './cubes/graycube.js';
import { BlackCube } from './cubes/blackcube.js';
import { PurpleCube } from './cubes/purpleCube.js'
import { build } from './rooms/level1.js';
import { getFirstInPosition } from './search/searchFunctions.js';

var canvas = document.getElementById('canvas');
var bup = document.getElementById('buttonUp');
var bdo = document.getElementById('buttonDo');
var grow = document.getElementById('grow');
var disa = document.getElementById('dissapear');
var levi = document.getElementById('levitate');
var ctx = canvas.getContext('2d');

var room = build(ctx);

canvas.width = room.width;
canvas.height = room.height;

var editHeight ={type: undefined,value:undefined};

bup.addEventListener('touchstart', function(e){
  editHeight = {type:'height',value:1};
});
bdo.addEventListener('touchstart', function(e) {
  editHeight = {type:'height',value:-1};
});
grow.addEventListener('touchstart', function(e) {
  editHeight = {type:'grow',value:undefined};
});
disa.addEventListener('touchstart', function(e) {
  editHeight = {type:'dissapear',value:undefined};
});
levi.addEventListener('touchstart', function(e) {
  editHeight = {type:'levitate',value:undefined};
});
var tmpTouch = undefined;
canvas.addEventListener('touchstart', function(e){
  tmpTouch = e;
});

var touching = undefined;

canvas.addEventListener('touchmove', function(e) {
  var touch = getcoords(e);
  if(touching){
    touching.onDrag(touch.x,touch.y);
  }else{
    let findedObj = getFirstInPosition(room,touch.x,touch.y);
    if(findedObj && findedObj.isDragable){
      touching = findedObj;
        touching.onDrag(touch.x,touch.y);
    }
  }
})

canvas.addEventListener('touchend',function(){
  if(touching){
    touching = undefined;
  }else{
    var touch = getcoords(tmpTouch);
  var finded = false;
  let i = room.getElements().length - 1;
  let findedObj = getFirstInPosition(room,touch.x,touch.y);
  if(findedObj){
    if(editHeight.type){
      edit(editHeight,findedObj)
    }else if (findedObj instanceof BlackCube || findedObj instanceof GrayCube) {
      room.getPlayer().onClick(touch.x, touch.y);
    }else if(findedObj instanceof PurpleCube){
      findedObj.teleport(room.getPlayer());
    }
    else{
      findedObj.onClick(touch.x,touch.y);
    }
  }else{
    room.getPlayer().onClick(touch.x,touch.y);
  }
  }
})
function edit(edit,findedObj){
  if(edit.type==='height'){
    findedObj.height += edit.value;
  }
  if(edit.type === 'grow'){
    findedObj.grow();
  }
  if(edit.type === 'dissapear'){
    findedObj.dissapear();
  }
  if(edit.type === 'levitate'){
    findedObj.levitate();
  }
  edit.type = undefined;
}
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
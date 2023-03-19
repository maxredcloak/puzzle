import { Cube } from './cubes/cube.js';
import { Room } from './rooms/room.js';
import { GrayCube } from './cubes/graycube.js';
import { BlackCube } from './cubes/blackcube.js';
import { PurpleCube } from './cubes/purpleCube.js'
import { build } from './rooms/level2.js';
import { getFirstInPosition } from './search/searchFunctions.js';
import { HeightCommand, GrowCommand, DisappearCommand, LevitateCommand,GrabCommand} from './commands/interactiveObjCommand.js';

var canvas = document.getElementById('canvas');
var bup = document.getElementById('buttonUp');
var bdo = document.getElementById('buttonDo');
var grow = document.getElementById('grow');
var disa = document.getElementById('dissapear');
var levi = document.getElementById('levitate');
var grab = document.getElementById('grab');
var ctx = canvas.getContext('2d');

var room = build(ctx);

canvas.width = room.width;
canvas.height = room.height;

var editHeight = undefined;

bup.addEventListener('touchstart', function(e){
  editHeight = new HeightCommand(1);
});
bdo.addEventListener('touchstart', function(e) {
  editHeight = new HeightCommand(-1);
});
grow.addEventListener('touchstart', function(e) {
  editHeight = new GrowCommand();
});
disa.addEventListener('touchstart', function(e) {
  editHeight = new DisappearCommand();
});
levi.addEventListener('touchstart', function(e) {
  editHeight = new LevitateCommand();
});
grab.addEventListener('touchstart', function(e) {
  editHeight = new GrabCommand();
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
const xc = document.getElementById("x");
const yc = document.getElementById("y");
const ac = document.getElementById("action");

canvas.addEventListener('touchend',function(){
  if(touching){
    touching = undefined;
  }else{
    var touch = getcoords(tmpTouch);
    var finded = false;
    let i = room.getElements().length - 1;
    let findedObj = getFirstInPosition(room,touch.x,touch.y);
    if(findedObj){
      if(editHeight){
       editHeight.execute(findedObj);
        if(editHeight instanceof GrabCommand ){
          if(room.getPlayer().friends){
            let o = room.getPlayer().release(touch.x,touch.y);
            room.getElements().push(o);
            editHeight = undefined;
          }
      }else{
        editHeight = undefined;
      }
      
    }else if (findedObj instanceof BlackCube || findedObj instanceof GrayCube) {
      room.getPlayer().onClick(touch.x, touch.y);
    }else if(findedObj instanceof PurpleCube){
      findedObj.teleport(room.getPlayer());
    }
    else{
      let returnObj = findedObj.onClick(touch.x,touch.y);
      if(returnObj){
        room.getPlayer().grab(returnObj);
      }
    }
  }else{
      room.getPlayer().onClick(touch.x,touch.y);
    }
  }
})

function getcoords(e){
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;
  return {x: touchX, y: touchY}
}

function doMovement(){
  if(xc.innerHTML.length >0 && yc.innerHTML.length >0){
    room.getPlayer().target.x = room.getPlayer().x + parseInt(xc.innerHTML)*100;
    room.getPlayer().target.y = room.getPlayer().y + parseInt(yc.innerHTML)*100;
  }else{
    room.getPlayer().stop();
  }
  if(ac.innerHTML.length > 0){
    room.launchSpell(1);
  }
}
function loop() {
  room.getElements().forEach(e => {
    e.update(room);
  });
  doMovement();
  room.draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
import { Cube } from '../cubes/cube.js';

export function updateSpeed(movingObj) {
    if (movingObj.target.x !== undefined && movingObj.target.y !== undefined) {
      var distanceX = movingObj.target.x - (movingObj.x + movingObj.sizeX / 2);
      var distanceY = movingObj.target.y - (movingObj.y + movingObj.sizeX / 2);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (Math.abs(distanceX) > movingObj.sizeX || Math.abs(distanceY) > movingObj.sizeY) {
        movingObj.speed.x = movingObj.maxSpeed * distanceX / distance;
        movingObj.speed.y = movingObj.maxSpeed * distanceY / distance;
      } else {
        movingObj.speed.x = 0;
        movingObj.speed.y = 0;
        movingObj.target.x = undefined;
        movingObj.target.y = undefined;
      }
    }
  }

const STOP = "STOP";
const PLATFORM = "PLATFORM";
const NONE = "NONE"; 
  
export function collide(movingObj,elements){
  let status = NONE;
  let i = elements.length -1;
  while(elements[i] && status === NONE){
    let e = elements[i];
    if(isTouching(movingObj,e) ){
      status = PLATFORM;
      if (e.height === movingObj.height +1 || e.height === movingObj.height - 1){
          movingObj.height = e.height;
      }else if(e.height !== movingObj.height){
        status = STOP;
      }
    }
    i--;
  }
  if(status === STOP){
    movingObj.stop();
  }
}

export function fallCollide(movingObj,elements){
  let status = NONE;
  let i = elements.length -1;
  while(elements[i] && status === NONE){
    let e = elements[i];
    if(isTouching(movingObj,e) ){
      status = PLATFORM;
      if (e.height <= movingObj.height){
          movingObj.height = e.height;
      }else{
        status = STOP;
      }
    }
    i--;
  }
  if(status === STOP){
    movingObj.stop();
  }
}

export function floatingCollide(movingObj,elements){
  let status = NONE;
  let i = elements.length -1;
  while(elements[i] && status === NONE){
    let e = elements[i];
    if(isTouching(movingObj,e) ){
      status = PLATFORM;
      if (e.height > movingObj.height){
        status = STOP;
      }else if(!(e instanceof Cube) && e.height === movingObj.height){
        movingObj.height ++;
      }
    }
    i--;
  }
  if(status === STOP){
    movingObj.stop();
  }
}

export function isTouching(obj1,e){
   return (obj1.x + obj1.speed.x > e.x - obj1.sizeX && obj1.x + obj1.speed.x < e.x + e.sizeX && obj1.y + obj1.speed.y > e.y - obj1.sizeX && obj1.y + obj1.speed.y < e.y + e.sizeY && obj1 !== e && !e.isTransparent)
}

export function executeMovement(movingObj,room) {
    movingObj.x += movingObj.speed.x;
    movingObj.y += movingObj.speed.y;

    if (movingObj.x < 0) {
      movingObj.x = 0;
    }
    if (movingObj.y < 0) {
      movingObj.y = 0;
    }
    if (movingObj.x + movingObj.sizeX > room.width) {
      movingObj.x = room.width - movingObj.sizeX;
    }
    if (movingObj.y + movingObj.sizeY > room.height) {
      movingObj.y = room.height - movingObj.sizeY;
    }
  }
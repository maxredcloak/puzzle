import { Room } from '../rooms/room.js';
import baseCube from './base/baseCube.js';
import { executeMovement,updateSpeed,collide } from '../physics/movement.js';

export class Cube extends baseCube{
  constructor(x, y, height, sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'blue');
  }
  onClick(x,y){
    this.target.x = x;
    this.target.y = y;
    this.friends = undefined;
    this.grabbed = false;
  }
  grab(object){
    this.friends = object;
    this.grabbed = true;
  }
  cleanFriend(){
    this.color = 'blue';
    this.friends = undefined;
  }
  update(room) {
    if(this.grabbed){
      room.deleteElement(this.friends);
      this.grabbed = false;
      this.color = 'darkblue';
    }
    updateSpeed(this);
    collide(this,room.getElements());
    executeMovement(this,room);
  }
}

import { Room } from '../rooms/room.js';
import baseCube from './base/baseCube.js';
import { executeMovement,updateSpeed,collide } from '../physics/movement.js';

export class Cube extends baseCube{
  constructor(x, y, height, sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'blue');
    this.friends = undefined;
    this.facingPosition = {x:0,y:0}
  }
  onClick(x,y){
    this.target.x = x;
    this.target.y = y;
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
  release(x,y){
    if(this.friends){
      let releasingFriend = this.friends;
      this.color = 'blue';
      releasingFriend.x = x < this.x ? this.x - this.sizeX/2: this.x+this.sizeX/2;
      releasingFriend.y = y < this.y ? this.y-this.sizeY/2: this.y+this.sizeY/2;
      releasingFriend.target.x = x;
      releasingFriend.target.y = y;
      releasingFriend.height = this.height;
      this.cleanFriend();
      return releasingFriend;
    }
  }
  update(room) {
    if(this.grabbed){
      room.deleteElement(this.friends);
      this.grabbed = false;
      this.color = 'darkblue';
    }
    updateSpeed(this);
    if(this.speed.x !== 0 || this.speed.y !== 0){
      this.facingPosition = {x:this.speed.x,y:this.speed.y}
    }
    collide(this,room.getElements());
    executeMovement(this,room);
  }
}

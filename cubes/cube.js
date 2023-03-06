import { Room } from '../rooms/room.js';
import { baseCube } from './baseCube.js';
import { BlackCube } from './blackcube.js';
import { GrayCube } from './graycube.js';
import { updateSpeed,collide } from '../physics/movement.js'

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
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x + this.sizeX > room.width) {
      this.x = room.width - this.sizeX;
    }
    if (this.y + this.sizeY > room.height) {
      this.y = room.height - this.sizeY;
    }
  }
  draw(ctx) {
    if (this.isTransparent === true) {
      ctx.globalAlpha = 0.5;
    } else {
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = 'cyan';
    if(this.floating){
      ctx.fillRect(this.x-2, this.y-2, this.sizeX+4, this.sizeY+4);
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = "white"
    ctx.fillText(this.height, this.x + this.sizeX/2, this.y + this.sizeY/2);
  }
}

import { Room } from '../rooms/room.js';
import { baseCube } from './baseCube.js';
import { BlackCube } from './blackcube.js';
import { GrayCube } from './graycube.js';
import { updateSpeed,collide } from '../physics/movement.js'

export class Cube extends baseCube{
  constructor(x, y, height, sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'blue')
    this.speed = {
      x: 0,
      y: 0
    };
    this.target = {
      x: undefined,
      y: undefined
    };
    this.maxSpeed = 5;
  }
  onClick(x,y){
    this.target.x = x;
    this.target.y = y;
  }
  
  stop(){
    this.speed.x = 0;
    this.speed.y= 0;
    this.target.x = undefined;
    this.target.y = undefined;
  }
  
  update(room) {
    updateSpeed(this);
    collide(this,room.getElements())
   // this.collide(room.getElements());
    // Actualizar la posición del cubo
    this.x += this.speed.x;
    this.y += this.speed.y;

    // Mantener el cubo dentro de la habitación
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
}

import { Room } from '../rooms/room.js';
import { baseCube } from './baseCube.js';
import { BlackCube } from './blackcube.js';
import { GrayCube } from './graycube.js';
import { updateSpeed,collide } from '../physics/movement.js'

export class Cube extends baseCube{
  constructor(x, y, height, sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'blue')
  }
  onClick(x,y){
    this.target.x = x;
    this.target.y = y;
  }
  
  update(room) {
    updateSpeed(this);
    collide(this,room.getElements());
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

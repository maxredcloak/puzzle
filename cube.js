import { Room } from './room.js';
import { baseCube } from './baseCube.js';

export class Cube extends baseCube{
  constructor(x, y, size) {
    super(x,y,size,'blue')
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
  update() {
    this.updateCubeSpeed();
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
    if (this.x + this.size > Room.width) {
      this.x = Room.width - this.size;
    }
    if (this.y + this.size > Room.height) {
      this.y = Room.height - this.size;
    }
  }

  updateCubeSpeed() {
    if (this.target.x !== undefined && this.target.y !== undefined) {
      var distanceX = this.target.x - (this.x + this.size / 2);
      var distanceY = this.target.y - (this.y + this.size / 2);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (Math.abs(distanceX) > this.size || Math.abs(distanceY) > this.size) {
        this.speed.x = this.maxSpeed * distanceX / distance;
        this.speed.y = this.maxSpeed * distanceY / distance;
      } else {
        this.speed.x = 0;
        this.speed.y = 0;
        this.target.x = undefined;
        this.target.y = undefined;
      }
    }
  }
}

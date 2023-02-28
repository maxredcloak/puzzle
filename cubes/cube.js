import { Room } from '../rooms/room.js';
import { baseCube } from './baseCube.js';
import { BlackCube } from './blackcube.js';
import { GrayCube } from './graycube.js';

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
  
  stop(){
    this.speed.x = 0;
    this.speed.y= 0;
    this.target.x = undefined;
    this.target.y = undefined;
  }
  
  STOP = "STOP";
  PLATFORM = "PLATFORM";
  NONE = "NONE";
  collide(elements){
    status = this.NONE;
    elements.forEach(e =>{
      if (this.x + this.speed.x > e.x - e.size/2 - 6 && this.x + this.speed.x < e.x + e.size &&
        this.y + this.speed.y > e.y - e.size/2 - 6 && this.y + this.speed.y < e.y + e.size
        ||
        this.x + this.speed.x < e.x -e.size/2-6 && this.x + this.speed.x + this.size > e.x &&
        this.y < e.y && this.y + this.size > e.y + e.size
        ) {
          if(e instanceof BlackCube && status !== this.PLATFORM){
            status = this.STOP;
          }
          if(e instanceof GrayCube){
            status = this.PLATFORM;
          }
      }
    });
    if(status === this.STOP){
      this.stop();
    }
  }
  update(room) {
    this.updateCubeSpeed();
    this.collide(room.getElements());
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
    if (this.x + this.size > room.width) {
      this.x = room.width - this.size;
    }
    if (this.y + this.size > room.height) {
      this.y = room.height - this.size;
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

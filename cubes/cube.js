import { Room } from '../rooms/room.js';
import { baseCube } from './baseCube.js';
import { BlackCube } from './blackcube.js';
import { GrayCube } from './graycube.js';

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
  
  STOP = "STOP";
  PLATFORM = "PLATFORM";
  NONE = "NONE";
  
  collide(elements){
    status = this.NONE;
    let finded = false;
    let i = elements.length -1;
    while(elements[i] && !finded){
      let e = elements[i];
      if(this.x + this.speed.x > e.x - this.sizeX && this.x + this.speed.x < e.x + e.sizeX &&
          this.y + this.speed.y > e.y - this.sizeX && this.y + this.speed.y < e.y + e.sizeX && this !== e
      ){
        finded = true;
        if (e.height === this.height +1 || e.height === this.height - 1){
            this.height = e.height;
        }else if(e.height !== this.height){
          status = this.STOP;
        }
      }
      i--;
    }
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
    if (this.x + this.sizeX > room.width) {
      this.x = room.width - this.sizeX;
    }
    if (this.y + this.sizeY > room.height) {
      this.y = room.height - this.sizeY;
    }
  }

  updateCubeSpeed() {
    if (this.target.x !== undefined && this.target.y !== undefined) {
      var distanceX = this.target.x - (this.x + this.sizeX / 2);
      var distanceY = this.target.y - (this.y + this.sizeX / 2);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (Math.abs(distanceX) > this.sizeX || Math.abs(distanceY) > this.sizeY) {
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

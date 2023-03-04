import { baseCube } from './baseCube.js';
import { updateSpeed,fallCollide,floatingCollide, collide } from '../physics/movement.js'
import { getTouchingObj } from '../search/searchFunctions.js'

export class PinkCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'pink');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 1;
  }

  update(room) {
    if(!this.target.x &&!this.target.y){
      this.target.x = Math.random() * room.width;
      this.target.y = Math.random() * room.height;
    }
    updateSpeed(this);
    let objs = getTouchingObj(this,room.getElements());
    objs.forEach(o => {
      if(o instanceof PinkCube){
        console.log("p")
      }
    })
    collide(this, room.getElements());
    
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
  grow(){
    if (!this.isGrowing && this.sizeX < this.maxGrowSize) {
      this.isGrowing = true;
      this.isShrinking = false;
    } else if(this.sizeX > this.minGrowSize) {
      this.isShrinking = true;
      this.isGrowing = false;
    }
  }
  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }

  onClick(x,y) {
  }
  levitate(){
    this.floating = !this.floating;
    if(this.floating){
      this.height++;
    }else{
      this.height--;
    }
  }
}

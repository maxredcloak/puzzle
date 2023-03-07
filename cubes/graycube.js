import baseCube from './base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide } from '../physics/movement.js'
import basicGrow from './functions/basicGrow.js'
import basicLevitate from './functions/basicLevitate.js'

export class GrayCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'darkred');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15;
    this.grow = basicGrow;
    this.levitate = basicLevitate;
  }

  update(room) {
    if (this.isGrowing && this.sizeX < this.maxGrowSize) {
      this.sizeX += 1;
      this.sizeY += 1;
    } else if (this.isGrowing) {
      this.isGrowing = false;
    }
    if (this.isShrinking && this.sizeX > this.minGrowSize) {
      this.sizeX -= 1;
      this.sizeY -= 1;
    } else if (this.isShrinking) {
      this.isShrinking = false;
    }
    updateSpeed(this);
    if(this.floating){
      floatingCollide(this,room.getElements())
    }else{
      fallCollide(this,room.getElements());
    }
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

  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }
  
  dissapear(){
    this.isTransparent = !this.isTransparent;
  }
  
}

import { baseCube } from './baseCube.js';
import { updateSpeed,fallCollide,floatingCollide } from '../physics/movement.js'

export class PurpleCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'purple');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15
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
  }

  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }

  onClick(x,y) {
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
  dissapear(){
    this.isTransparent = !this.isTransparent;
  }
  levitate(){
    this.floating = !this.floating;
    if(this.floating){
      this.height++;
    }else{
      this.height--;
    }
  }
  teleport(cube){
    if(this.floating){
      cube.x = this.x + this.sizeX;
      cube.y = this.y + this.sizeY;
      cube.height = this.height -1;
    }
  }
}

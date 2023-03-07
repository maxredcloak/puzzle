import baseCube from './base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide } from '../physics/movement.js'

export class YellowCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'khaki');
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

  update(room) {
    this.deactivate();
  }
  activate()
  {
    this.isTransparent = true;
  }
  deactivate(){
    this.isTransparent = false;
  }
}

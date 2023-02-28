import { baseCube } from './baseCube.js';

export class GrayCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'gray');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
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
    this.x = x;
    this.y = y;
  }

  onClick(x,y) {
    if (!this.isGrowing && this.sizeX < this.maxGrowSize) {
      this.isGrowing = true;
      this.isShrinking = false;
    } else if(this.sizeX > this.minGrowSize) {
      this.isShrinking = true;
      this.isGrowing = false;
    }
  }
}

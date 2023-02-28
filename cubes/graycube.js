import { baseCube } from './baseCube.js';

export class GrayCube  extends baseCube{
  constructor(x, y, size) {
    super(x,y,size,'gray');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = size * 2;
    this.isShrinking = false;
    this.minGrowSize = size;
  }

  update(room) {
    if (this.isGrowing && this.size < this.maxGrowSize) {
      this.size += 1;
    } else if (this.isGrowing) {
      this.isGrowing = false;
    }
    if (this.isShrinking && this.size > this.minGrowSize) {
      this.size -= 1;
    } else if (this.isShrinking) {
      this.isShrinking = false;
    }
  }

  onDrag(x,y){
    this.x = x;
    this.y = y;
  }

  onClick(x,y) {
    if (!this.isGrowing && this.size < this.maxGrowSize) {
      this.isGrowing = true;
      this.isShrinking = false;
    } else if(this.size > this.minGrowSize) {
      this.isShrinking = true;
      this.isGrowing = false;
    }
  }
}

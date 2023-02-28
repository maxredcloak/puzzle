import { baseCube } from './baseCube.js';

export class GrayCube  extends baseCube{
  constructor(x, y, size) {
    super(x,y,size,'gray');
    this.isDragable = true;
    this.isGrowing = false; // indicador de si el cubo está creciendo o no
    this.minGrowSize = size;
    this.maxGrowSize = size * 2; // tamaño máximo al que puede crecer el cubo
    this.isShrinking = false;
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

  move(xx, yy) {
    this.x = xx;
    this.y = yy;
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

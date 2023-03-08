export function growingUpdate(){
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
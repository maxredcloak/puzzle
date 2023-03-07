export default function basicGrow(){
  if (!this.isGrowing && this.sizeX < this.maxGrowSize) {
    this.isGrowing = true;
    this.isShrinking = false;
  } else if(this.sizeX > this.minGrowSize) {
    this.isShrinking = true;
    this.isGrowing = false;
  }
}
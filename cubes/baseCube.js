export class baseCube{
  constructor(x, y, sizeX,sizeY, height, color) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.height = height;
    this.color = color;
    this.isDragable = false;
    this.isTransparent = false;
  }
  onClick(x,y) {
  }
  onDrag(x,y){
  }
  grow(){}
  update(room){}
  
  draw(ctx) {
    if (this.isTransparent === true) {
      ctx.globalAlpha = 0.5;
    } else {
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = "white"
    ctx.fillText(this.height, this.x + this.sizeX/2, this.y + this.sizeY/2);
  }
  isTouching(cube){
    return false;
  }
  dissapear(){}
}
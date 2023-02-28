export class baseCube{
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isDragable = false;
  }
  onClick(x,y) {
  }
  onDrag(x,y){
  }
  update(room){
    return;
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  isTouching(cube){
    return false;
  }
}
export default function basicDraw(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 40px sans-serif';
  ctx.fillStyle = "white"
  ctx.fillText(this.height, this.x + this.sizeX / 2, this.y + this.sizeY / 2);
}
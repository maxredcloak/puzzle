import baseCube from '../cubes/base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide } from '../physics/movement.js'

export class GreenReceptor extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'olive');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15
    this.active = false;
  }
  assign(obj){
    this.assigned = obj;
  }
  update(room) {
    if(this.active){
      this.assigned.activate();
      this.active = false;
    }
  }

activate(){
  this.active = true;
}
  draw(ctx){
    if (this.isTransparent === true) {
      ctx.globalAlpha = 0.5;
    } else {
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = 'cyan';
    if(this.floating){
      ctx.fillRect(this.x-2, this.y-2, this.sizeX+4, this.sizeY+4);
    }
    ctx.fillStyle = this.color;
  //  ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.sizeX, 0, 2 * Math.PI);
  ctx.fill()
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 40px sans-serif';
    ctx.fillStyle = "white"
    ctx.fillText(this.height, this.x, this.y);
  }
}

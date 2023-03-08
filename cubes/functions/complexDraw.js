import basicDraw from './basicDraw.js';

export function transparentDraw(ctx){
  if (this.isTransparent === true) {
      ctx.globalAlpha = 0.5;
    } else {
      ctx.globalAlpha = 1;
    }
}
export function floatingDraw(ctx){
  ctx.fillStyle = 'cyan';
  if(this.floating){
    ctx.fillRect(this.x-2, this.y-2, this.sizeX+4, this.sizeY+4); 
  }
}

export function complexDraw(ctx){
  this.td = transparentDraw;
  this.fd = floatingDraw;
  this.bd = basicDraw;
  this.td(ctx)
  this.fd(ctx);
  this.bd(ctx);
}
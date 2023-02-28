import { Cube } from './cube.js';
import { GrayCube } from './graycube.js';

export class Room{
  constructor(height, width, ctx){
    this.width = width;
    this.height = height;
    this.color = 'white';
    this.elements = [];
    this.ctx = ctx
  }
  add(element){
    this.elements.push(element);
  }
  getElements(){
    return this.elements;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.elements.forEach(e =>{
      e.draw(this.ctx);
    });
  }
}
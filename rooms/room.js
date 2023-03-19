import { Cube } from '../cubes/cube.js';
import { GrayCube } from '../cubes/graycube.js';

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
  deleteElement(o){
    this.elements = this.elements.filter(e => e !== o);
  }
  getPlayer(){
    return this.elements.filter(e => e instanceof Cube)[0]
  }
  launchSpell(spell){
    var pp = this.getPlayer();
    var position = pp.facingPosition;
    position.x += pp.x;
    position.y += pp.y;
//    if()
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.elements.forEach(e =>{
      e.draw(this.ctx);
    });
  }
}
import PhysicalObject from '../interfaces/physicalObject.js';
import basicDraw from '../functions/basicDraw.js';
import {complexDraw} from '../functions/complexDraw.js';
export default class baseCube extends PhysicalObject{
  constructor(x, y, sizeX,sizeY, height, color) {
    super(x,y,sizeX,sizeY,height);
    this.color = color;
    this.isDragable = false;
    this.isTransparent = false;
    this.floating = false;
    this.speed = {
      x: 0,
      y: 0
    };
    this.target = {
      x: undefined,
      y: undefined
    };
    this.maxSpeed = 5;
    this.draw = complexDraw;
  }
  stop(){
    this.speed.x = 0;
    this.speed.y= 0;
    this.target.x = undefined;
    this.target.y = undefined;
  }
  onClick(x,y) {}
  onDrag(x,y){}
  grow(){}
  update(room){}
  dissapear(){}
  levitate(){}
}
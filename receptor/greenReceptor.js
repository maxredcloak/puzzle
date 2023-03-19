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
}
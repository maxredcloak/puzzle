import baseCube from './base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide } from '../physics/movement.js';
import basicLevitate from './functions/basicLevitate.js'

export class PurpleCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'purple');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15
    this.levitate = basicLevitate;
  }

  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }

  dissapear(){
    this.isTransparent = !this.isTransparent;
  }
  teleport(cube){
    if(this.floating){
      cube.x = this.x + this.sizeX;
      cube.y = this.y + this.sizeY;
      cube.height = this.height -1;
    }
  }
}

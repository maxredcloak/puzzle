import baseCube from './base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide,executeMovement,collide } from '../physics/movement.js'
import basicGrow from './functions/basicGrow.js'
import basicLevitate from './functions/basicLevitate.js'
import {growingUpdate} from './functions/complexUpdate.js'

export class GrayCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY,objectHeight=1) {
    super(x,y,sizeX,sizeY,height,'darkred');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15;
    this.grow = basicGrow;
    this.levitate = basicLevitate;
    this.growingUpdate = growingUpdate;
  }

  update(room) {
    this.growingUpdate();
    updateSpeed(this);
    if(this.floating){
      floatingCollide(this,room.getElements())
    }else{
      fallCollide(this,room.getElements());
    }
    executeMovement(this,room);
  }
  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }
  dissapear(){
    this.isTransparent = !this.isTransparent;
  }
}
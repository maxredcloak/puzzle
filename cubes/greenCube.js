import baseCube from './base/baseCube.js';
import { updateSpeed,fallCollide,floatingCollide, executeMovement } from '../physics/movement.js';
import { getTouchingObj } from '../search/searchFunctions.js'
import { GreenReceptor } from '../receptor/greenReceptor.js';
import basicGrow from './functions/basicGrow.js';
import basicLevitate from './functions/basicLevitate.js';
import {growingUpdate} from './functions/complexUpdate.js';

export class GreenCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'darkgreen');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX * 2;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 15;
    this.grow = basicGrow;
    this.levitate = basicLevitate;
    this.complexUpdate = growingUpdate;
  }

  update(room) {
    this.complexUpdate();
    updateSpeed(this);
    if(this.floating){
      floatingCollide(this,room.getElements())
    }else{
      fallCollide(this,room.getElements());
    }
    executeMovement(this,room);
    var touched = getTouchingObj(this,room.getElements());
    touched.forEach(t =>{
      if(t instanceof GreenReceptor){
        t.activate()
      }
    });
  }
  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }
  dissapear(){
    this.isTransparent = !this.isTransparent;
  }
}

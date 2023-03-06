import { baseCube } from './baseCube.js';
import { updateSpeed,fallCollide,floatingCollide, collide } from '../physics/movement.js'
import { getTouchingObj } from '../search/searchFunctions.js'

export class PinkCube  extends baseCube{
  constructor(x, y,height,sizeX,sizeY) {
    super(x,y,sizeX,sizeY,height,'pink');
    this.isDragable = true;
    this.isGrowing = false;
    this.maxGrowSize = sizeX;
    this.isShrinking = false;
    this.minGrowSize = sizeX;
    this.maxSpeed = 1;
    this.friends = [];
    this.takeone = false;
  }

  update(room) {
    if(this.takeone){
      this.takeone = false;
      if(this.friends.length >0){
        let friend = this.friends.splice(0,1)[0];
        friend.speed.x = -this.speed.x;
        friend.speed.y = -this.speed.y;
        friend.x = this.x + friend.speed.x * this.sizeX * 1.5;
        friend.y = this.y + friend.speed.y * this.sizeY * 1.5;
        room.getElements().push(friend);
        this.isShrinking = true;
        this.maxGrowSize -= 10;
        this.minGrowSize = this.maxGrowSize;
      }
    }
    if (this.isGrowing && this.sizeX < this.maxGrowSize) {
      this.sizeX += 1;
      this.sizeY += 1;
    } else if (this.isGrowing) {
      this.isGrowing = false;
    }
    if (this.isShrinking && this.sizeX > this.minGrowSize) {
      this.sizeX -= 1;
      this.sizeY -= 1;
    } else if (this.isShrinking) {
      this.isShrinking = false;
    }
    if(!this.target.x &&!this.target.y){
      this.target.x = Math.random() * room.width;
      this.target.y = Math.random() * room.height;
    }
    updateSpeed(this);
    let objs = getTouchingObj(this,room.getElements());
    objs.forEach(o => {
      if(o instanceof PinkCube && !o.friends.includes(this)){
        this.friends.push(o);
        room.deleteElement(o);
        this.maxGrowSize += 10;
        this.grow()
      }
    })
    collide(this, room.getElements());
    
    // Actualizar la posición del cubo
    this.x += this.speed.x;
    this.y += this.speed.y;
    
    // Mantener el cubo dentro de la habitación
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.x + this.sizeX > room.width) {
      this.x = room.width - this.sizeX;
    }
    if (this.y + this.sizeY > room.height) {
      this.y = room.height - this.sizeY;
    }
  }
  grow(){
    if (!this.isGrowing && this.sizeX < this.maxGrowSize) {
      this.isGrowing = true;
      this.isShrinking = false;
    } else if(this.sizeX > this.minGrowSize) {
      this.isShrinking = true;
      this.isGrowing = false;
    }
  }
  onDrag(x,y){
    this.target.x = x;
    this.target.y = y;
  }

  onClick(x,y) {
    if(this.friends.length === 0){
      return this;
    }
    this.takeone = true;
  }
  levitate(){
    this.floating = !this.floating;
    if(this.floating){
      this.height++;
    }else{
      this.height--;
    }
  }
}

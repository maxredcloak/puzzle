export default class PhysicalObject{
  constructor(x, y, sizeX,sizeY, height) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.height = height;
  }
  update(room){}
  interact(){}
}
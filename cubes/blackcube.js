import baseCube from './base/baseCube.js';

export class BlackCube extends baseCube {
  constructor(x, y,height,sizeX,sizeY) {
    super(x, y, sizeX,sizeY, height, 'black');
    this.color = "#"+height +"0"+height+"0"+height+"0";
  }
}
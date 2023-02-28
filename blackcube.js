import { baseCube } from './baseCube.js';

export class BlackCube extends baseCube {
  constructor(x, y, size) {
    super(x, y, size, 'black');
  }

  onClick(x,y) {
    console.log('BlackCube clicked!');
  }
  onDrag(x,y){
  }
  isTouching(cube) {
    const cubeRight = cube.x + cube.size;
    const cubeBottom = cube.y + cube.size;
    const blackCubeRight = this.x + this.size;
    const blackCubeBottom = this.y + this.size;
    if (cube.x < blackCubeRight && cubeRight > this.x && cube.y < blackCubeBottom && cubeBottom > this.y) {
      return true;
    }
    return false;
  }
}
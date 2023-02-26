import { baseCube } from './baseCube.js';

export class BlackCube extends baseCube {
  constructor(x, y, size) {
    super(x, y, size, 'black');
  }

  onClick(x,y) {
    console.log('BlackCube clicked!');
  }

  move() {
    // Do nothing, BlackCube cannot be moved
  }
}
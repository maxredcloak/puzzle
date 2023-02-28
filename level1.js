import { Cube } from './cube.js';
import { Room } from './room.js';
import { GrayCube } from './graycube.js';
import { BlackCube } from './blackcube.js';

export const build = (ctx) => {
  let room = new Room(600,600,ctx);
  
  var myCube = new Cube(200, 200, 60);

  //El orden en el listado influye en su orden de renderizado
  room.add(new BlackCube(100, 100, 100, 'black'));
  room.add(new GrayCube(300, 300, 60));
  room.add(myCube);
  return room;
}
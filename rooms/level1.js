import { Cube } from '../cubes/cube.js';
import { Room } from './room.js';
import { GrayCube } from '../cubes/graycube.js';
import { BlackCube } from '../cubes/blackcube.js';

export const build = (ctx) => {
  let room = new Room(600,600,ctx);
  
  var myCube = new Cube(260, 150,4,60,60);

  //El orden en el listado influye en su orden de renderizado
  room.add(new BlackCube(0, 100,4,600,280));
  room.add(new BlackCube(0, 400,2,600,80));
  room.add(new BlackCube(0, 500,4,600,80));
  
  room.add(new GrayCube(150, 150,3,100,100));
  room.add(myCube);
  return room;
}
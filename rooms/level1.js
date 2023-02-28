import { Cube } from '../cubes/cube.js';
import { Room } from './room.js';
import { GrayCube } from '../cubes/graycube.js';
import { BlackCube } from '../cubes/blackcube.js';

export const build = (ctx) => {
  let room = new Room(600,600,ctx);
  
  var myCube = new Cube(260, 150,1,60,60);

  //El orden en el listado influye en su orden de renderizado
  room.add(new BlackCube(0, 250,3,600,80));
  room.add(new BlackCube(0, 350,3,600,80));
  room.add(new BlackCube(0, 450,4,600,80));
  
  room.add(new GrayCube(150, 150,2,100,100));
  room.add(myCube);
  return room;
}
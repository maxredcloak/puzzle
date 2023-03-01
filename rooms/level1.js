import { Cube } from '../cubes/cube.js';
import { Room } from './room.js';
import { GrayCube } from '../cubes/graycube.js';
import { BlackCube } from '../cubes/blackcube.js';

export const build = (ctx) => {
  let room = new Room(1100,1100,ctx);
  
  var myCube = new Cube(260, 150,4,60,60);

  //El orden en el listado influye en su orden de renderizado
 
  room.add(new BlackCube(0, 0,4,600,280));
  room.add(new BlackCube(0, 300,1,600,180));
  room.add(new BlackCube(0, 500,4,600,80));
  room.add(new BlackCube(0, 600,8,250,80));
  room.add(new BlackCube(350, 600,8,250,80));
  room.add(new BlackCube(620, 0,8,80,600));
  var a = new GrayCube(150, 150,5,100,100);
  a.dissapear();
  room.add(a);
  
  room.add(myCube);
  return room;
}
import { Cube } from '../cubes/cube.js';
import { Room } from './room.js';
import { GrayCube } from '../cubes/graycube.js';
import { BlackCube } from '../cubes/blackcube.js';
import { PurpleCube } from '../cubes/purpleCube.js';
import { GreenCube } from '../cubes/greenCube.js';
import { GreenReceptor } from '../cubes/greenReceptor.js';
import { YellowCube } from '../cubes/yellowCube.js';

export const build = (ctx) => {
  let room = new Room(1100,1100,ctx);
  
  var myCube = new Cube(260, 150,4,60,60);

  //El orden en el listado influye en su orden de renderizado
  room.add(new BlackCube(0, 0,4,380,280));
  room.add(new BlackCube(400, 0,3,80,280));
  room.add(new BlackCube(500, 0,2,100,280));
  room.add(new BlackCube(0, 300,1,600,180));
  room.add(new BlackCube(0, 500,6,600,80));
  room.add(new BlackCube(0, 600,8,250,80));
  room.add(new BlackCube(350, 600,8,250,80));
  room.add(new BlackCube(620, 0,8,80,600));
  room.add(new BlackCube(350, 700,1,80,600));
  room.add(new BlackCube(450, 700,3,700,500));
  room.add(new GrayCube(150, 150,4,100,100));
  room.add(new GrayCube(600, 800,4,100,100));
  room.add(new PurpleCube(450, 800,3,50,50));
  let y = new YellowCube(620, 600,8,500,80);
  let gr = new GreenReceptor(950, 800,3,30,30);
  gr.assign(y);
  room.add(y);
  room.add(gr);
  room.add(new GreenCube(550, 800,3,30,30));
  
  room.add(myCube);
  return room;
}
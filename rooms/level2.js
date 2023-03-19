import { Cube } from '../cubes/cube.js';
import { Room } from './room.js';
import { GrayCube } from '../cubes/graycube.js';
import { BlackCube } from '../cubes/blackcube.js';
import { PinkCube } from '../cubes/pinkCube.js';
import { PurpleCube } from '../cubes/purpleCube.js';
import { GreenCube } from '../cubes/greenCube.js';
import { GreenReceptor } from '../receptor/greenReceptor.js';
import { YellowCube } from '../cubes/yellowCube.js';

export const build = (ctx) => {
  let room = new Room(1100,1100,ctx);
  
  var myCube = new Cube(50, 50,4,60,60);

  //El orden en el listado influye en su orden de renderizado
  room.add(new BlackCube(0, 0,3,200,400));

  room.add(new BlackCube(220,0,1,100,400));
  room.add(new BlackCube(220,0,1,200,200));

  room.add(new BlackCube(340,220,3,280,180));
  room.add(new BlackCube(440,0,3,180,400));

  room.add(new BlackCube(0, 500,6,600,80));
  room.add(new BlackCube(0, 600,8,250,80));
  room.add(new BlackCube(350, 600,8,250,80));
  room.add(new BlackCube(620, 0,8,80,600));
  room.add(new BlackCube(350, 700,1,80,600));
  room.add(new BlackCube(450, 700,3,700,500));
  room.add(new GrayCube(240, 50,4,100,100));
  room.add(new GrayCube(600, 800,4,100,100));
  room.add(new PinkCube(50, 800,3,50,50));
  room.add(new PinkCube(120, 800,3,50,50));
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
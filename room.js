import { Cube } from './cube.js';

import { GrayCube } from './graycube.js';
export const Room = {
  width: 600,
  height: 600,
  color: 'white',
  draw: function(ctx) {
    // Dibujar el fondo
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);

 

    // Dibujar el GrayCube en la esquina inferior derecha
    GrayCube.x = this.width*0.75 - GrayCube.size;
    GrayCube.y = this.height*0.75 - GrayCube.size;
    GrayCube.draw(ctx);
       // Dibujar el Cube en la esquina superior izquierda
    Cube.draw(ctx);
  }
};


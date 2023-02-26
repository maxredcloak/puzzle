import { Cube } from './cube.js';

import { GrayCube } from './graycube.js';
export const Room = {
  width: 600,
  height: 600,
  color: 'white',
  draw: function(ctx,cube,blackcube,graycube) {
    // Dibujar el fondo
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    // Dibujar el GrayCube en la esquina inferior derecha
    blackcube.draw(ctx);
    graycube.draw(ctx);
       // Dibujar el Cube en la esquina superior izquierda
    cube.draw(ctx);
    
  }
};


import { Cube } from './cube.js';
import { Room } from './room.js';
import { GrayCube } from './graycube.js';

// Obtener el elemento canvas y el contexto de dibujo
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Establecer el tamaño del canvas
canvas.width = Room.width;
canvas.height = Room.height;

// Agregar un controlador de eventos touchstart al canvas
canvas.addEventListener('touchstart', function(e) {
  // Obtener las coordenadas de la posición tocada
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;

  // Verificar si se hizo clic en GrayCube
  if (touchX > GrayCube.x && touchX < GrayCube.x + GrayCube.size &&
      touchY > GrayCube.y && touchY < GrayCube.y + GrayCube.size) {
    GrayCube.onClick();
  } else {
    // Actualizar la ubicación objetivo de Cube
    Cube.target.x = touchX;
    Cube.target.y = touchY;
  }
});

var touching= false
// Agregar un controlador de eventos touchmove al canvas
canvas.addEventListener('touchmove', function(e) {
  // Obtener las coordenadas de la posición tocada
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;

  // Verificar si se hizo clic en GrayCube
  if (touchX > GrayCube.x && touchX < GrayCube.x + GrayCube.size &&
      touchY > GrayCube.y && touchY < GrayCube.y + GrayCube.size) {
    GrayCube.move(touchX, touchY);
  }
});

// Actualizar y dibujar la habitación y los cubos
function loop() {
  Cube.update();
  GrayCube.update();
  Room.draw(ctx);
  requestAnimationFrame(loop);
}

// Comenzar el bucle de juego
requestAnimationFrame(loop);

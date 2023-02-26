import { Cube } from './cube.js';
import { Room } from './room.js';
import { GrayCube } from './graycube.js';
import { BlackCube } from './blackcube.js';

// Obtener el elemento canvas y el contexto de dibujo
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var blackCube = new BlackCube(100, 100, 100, 'black');
var myCube = new Cube(200, 200, 60);
var myGrayCube = new GrayCube(300, 300, 60);

//El orden en el listado influye en su orden de renderizado
var elements = [blackCube,myGrayCube,myCube]

// Establecer el tamaño del canvas
canvas.width = Room.width;
canvas.height = Room.height;

// Agregar un controlador de eventos touchstart al canvas
canvas.addEventListener('touchstart', function(e) {
  // Obtener las coordenadas de la posición tocada
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;
  var finded = false;
  elements.forEach(e =>{
    if (touchX > e.x && touchX < e.x + e.size &&
      touchY > e.y && touchY < e.y + e.size) {
        finded = true;
        e.onClick(touchX,touchY);
    }
  });
  if(!finded){
    myCube.onClick(touchX,touchY);
  }
});

var touching = undefined;
// Agregar un controlador de eventos touchmove al canvas
canvas.addEventListener('touchmove', function(e) {
  // Obtener las coordenadas de la posición tocada
  var touchX = e.touches[0].clientX - canvas.offsetLeft;
  var touchY = e.touches[0].clientY - canvas.offsetTop;
  if(touching){
    myGrayCube.move(touchX,touchY);
  }
  // Verificar si se hizo clic en GrayCube
  if (touchX > myGrayCube.x && touchX < myGrayCube.x + myGrayCube.size &&
      touchY > myGrayCube.y && touchY < myGrayCube.y + myGrayCube.size) {
      touching = true;
    myGrayCube.move(touchX, touchY);
  }
})
canvas.addEventListener('touchend',function(e){
  touching = undefined;
})

// Actualizar y dibujar la habitación y los cubos
function loop() {
  myCube.update();
  myGrayCube.update();
  Room.draw(ctx, myCube, blackCube, myGrayCube);
  requestAnimationFrame(loop);
}

// Comenzar el bucle de juego
requestAnimationFrame(loop);

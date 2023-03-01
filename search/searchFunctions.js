export function getFirstInPosition(room,x,y){
  let i = room.getElements().length - 1;
  while(room.getElements()[i]){
    let e = room.getElements()[i];
    if (x > e.x && x < e.x + e.sizeX &&
      y > e.y && y < e.y + e.sizeY) {
        return e;
    }
    i--;
  }
}
export function updateSpeed(movingObj) {
    if (movingObj.target.x !== undefined && movingObj.target.y !== undefined) {
      var distanceX = movingObj.target.x - (movingObj.x + movingObj.sizeX / 2);
      var distanceY = movingObj.target.y - (movingObj.y + movingObj.sizeX / 2);
      var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (Math.abs(distanceX) > movingObj.sizeX || Math.abs(distanceY) > movingObj.sizeY) {
        movingObj.speed.x = movingObj.maxSpeed * distanceX / distance;
        movingObj.speed.y = movingObj.maxSpeed * distanceY / distance;
      } else {
        movingObj.speed.x = 0;
        movingObj.speed.y = 0;
        movingObj.target.x = undefined;
        movingObj.target.y = undefined;
      }
    }
  }
  
export function collide(movingObj,elements){
  const STOP = "STOP";
  const PLATFORM = "PLATFORM";
  const NONE = "NONE";
  
  let status = NONE;
  let i = elements.length -1;
  while(elements[i] && status === NONE){
    let e = elements[i];
    if(movingObj.x + movingObj.speed.x > e.x - movingObj.sizeX && movingObj.x + movingObj.speed.x < e.x + e.sizeX &&
        movingObj.y + movingObj.speed.y > e.y - movingObj.sizeX && movingObj.y + movingObj.speed.y < e.y + e.sizeY && movingObj !== e && !e.isTransparent
    ){
      status = PLATFORM;
      if (e.height === movingObj.height +1 || e.height === movingObj.height - 1){
          movingObj.height = e.height;
      }else if(e.height !== movingObj.height){
        status = STOP;
      }
    }
    i--;
  }
  if(status === STOP){
    movingObj.stop();
  }
}
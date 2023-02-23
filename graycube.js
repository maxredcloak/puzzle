export const GrayCube = {
  x: 300,   // posición x
  y: 300,   // posición y
  size: 60, // tamaño del cubo
  isGrowing: false, // indicador de si el cubo está creciendo o no
  maxGrowSize: 100, // tamaño máximo al que puede crecer el cubo
  draw: function(ctx) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  },
  update: function() {
    if (this.isGrowing) {
      this.grow();
    }
  },
  grow: function() {
    if (this.size < this.maxGrowSize) {
      this.size += 1;
    } else {
      this.isGrowing = false;
    }
  },
  move: function(xx,yy){
    console.log("moving",xx,"_",yy)
    this.x = xx;
    this.y = yy;
  },
  onClick: function() {
    this.isGrowing = true;
  }
};

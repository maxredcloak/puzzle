export default function levitate(){
    this.floating = !this.floating;
    if(this.floating){
      this.height++;
    }else{
      this.height--;
    }
  }
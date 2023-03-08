export default function basicLevitate(){
    this.floating = !this.floating;
    if(this.floating){
      this.height++;
    }else{
      this.height--;
    }
  }
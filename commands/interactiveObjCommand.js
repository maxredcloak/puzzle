import BaseCommand from './baseCommand.js';

export class HeightCommand extends BaseCommand{
  constructor(heightEdit){
    super();
    this.value = heightEdit;
  }
  execute(baseCube){
    baseCube.height += this.value;
  }
}

export class GrowCommand extends BaseCommand{
  constructor(){
    super();
  }
  execute(baseCube){
    baseCube.grow()
  }
}
export class DisappearCommand extends BaseCommand{
  constructor(){
    super();
  }
  execute(baseCube){
    baseCube.dissapear();
  }
}
export class LevitateCommand extends BaseCommand{
  constructor(){
    super();
  }
  execute(baseCube){
    baseCube.levitate();
  }
}
export class GrabCommand extends BaseCommand{
  constructor(){
    super();
  }
}
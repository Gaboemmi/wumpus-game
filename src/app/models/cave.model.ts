import { PositionDouble } from './../types/custom.types';
export class Cave {
  
  public position!: PositionDouble;
  public hasWumpus: boolean = false;
  public hasPit: boolean = false;
  public hasGold: boolean = false;
  public hasStench: boolean = false;
  public hasBreeze: boolean = false;

  constructor(position:PositionDouble){
    this.position = position;
  }
}
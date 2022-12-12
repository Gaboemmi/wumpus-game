import { PositionDouble } from "../interfaces/custom.interface";

export class Cave {
  
  public position!: PositionDouble;
  public hasWumpus: boolean = false;
  public hasPit: boolean = false;
  public hasGold: boolean = false;
  public hasStench: boolean = false;
  public hasBreeze: boolean = false;

  constructor(position:PositionDouble = {col:1, row:1}){
    this.position = position;
  }
}
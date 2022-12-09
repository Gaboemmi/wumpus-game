import { DirectionHunter, PositionDouble } from "../types/custom.types";
export class Hunter {

  public position: PositionDouble;
  public direction: DirectionHunter;
  public itsAlive: boolean;
  public arrows: number;
  public inventory: string[];

  constructor( arrows: number = 0){
    this.position = {col: 0, row: 0},
    this.direction = 'DOWN';
    this.itsAlive = true;
    this.arrows = arrows;
    this.inventory = [];
  }
}
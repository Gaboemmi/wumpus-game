import { PositionDouble } from "../interfaces/custom.interface";
import { DirectionMap } from "../types/custom.types";
export class Hunter {

  public position: PositionDouble;
  public direction: DirectionMap;
  public arrows: number;
  public inventory: string[];
  public itsAlive: boolean;
  public inMaze: boolean;

  constructor( arrows: number = 0 ){
    this.position = {col: 0, row: 0},
    this.direction = 'DOWN';
    this.itsAlive = true;
    this.arrows = arrows;
    this.inventory = [];
    this.inMaze = true;
  }
}
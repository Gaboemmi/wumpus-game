import { DirectionMap } from "../types/custom.types";

export interface PositionDouble { 
  col: number, 
  row: number 
};

export interface PositionArrow { 
  col: number, 
  row: number, 
  direction: DirectionMap 
};
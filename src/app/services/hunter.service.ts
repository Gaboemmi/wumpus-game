import { Injectable } from '@angular/core';
import { DirectionHunter, PositionDouble } from '../types/custom.types';

@Injectable({
  providedIn: 'root'
})
export class HunterService {

  position: PositionDouble = { col: 1, row: 1};

  direction: DirectionHunter = 'DOWN';

  positionArrow: PositionDouble | null = null;

  remainingArrows: number = 0;

  constructor() { }

  initHunter( amountOfArrows: any = 0 ){
    this.remainingArrows = amountOfArrows;
  }

}
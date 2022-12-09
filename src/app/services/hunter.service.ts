import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hunter } from '../models/hunter.model';
import { DirectionHunter, PositionDouble } from '../types/custom.types';

@Injectable({
  providedIn: 'root'
})
export class HunterService {

  private hunter = new BehaviorSubject<Hunter>(new Hunter)
  $hunter = this.hunter.asObservable();

  private positionArrow = new BehaviorSubject<PositionDouble|null>(null)
  $positionArrow = this.positionArrow.asObservable();

  limitCaveMap: number = 0;

  constructor(
  ) {}

  initHunter( amountOfArrows: any = 0, limitCaveMap: any = 1 ){
    this.hunter.next({...new Hunter(amountOfArrows) });
    this.limitCaveMap = limitCaveMap - 1;
  }

  turnLeft(){
    let direction: DirectionHunter = 'UP';
    switch (this.hunter.value.direction) {
      case 'DOWN':  direction = 'LEFT' ; break;
      case 'UP':    direction = 'RIGHT'; break;
      case 'LEFT':  direction = 'UP'   ; break;
      case 'RIGHT': direction = 'DOWN' ; break;
    } 
    this.hunter.next({...this.hunter.value, direction });
  }

  turnRight(){
    let direction: DirectionHunter = 'UP';
    switch (this.hunter.value.direction) {
      case 'DOWN':  direction = 'RIGHT'; break;
      case 'UP':    direction = 'LEFT' ; break;
      case 'LEFT':  direction = 'DOWN' ; break;
      case 'RIGHT': direction = 'UP'   ; break;
    } 
    this.hunter.next({...this.hunter.value, direction });
  }

  goForward(){
    let position: PositionDouble = { ...this.hunter.value.position };
    switch (this.hunter.value.direction) {
      case 'DOWN':  position.row = position.row+1 ; break;
      case 'UP':    position.row = position.row-1 ; break;
      case 'LEFT':  position.col = position.col-1 ; break;
      case 'RIGHT': position.col = position.col+1 ; break;
    } 
    if( (position.col >= 0 && position.col <= this.limitCaveMap) && 
        (position.row >= 0 && position.row <= this.limitCaveMap)
    ){
      this.hunter.next({...this.hunter.value, position:{...position} });
    }else{
      alert('PARED')
    }
  }

  shootArrow(){

    const hunterArrows: number = this.hunter.value.arrows;

    if( hunterArrows <= 0 ){
      alert('NO TIENES MAS FLECHAS')
      return;
    }

    this.hunter.next({...this.hunter.value, arrows: (hunterArrows - 1) });

    let startPosition = { ...this.hunter.value.position };
    const initDireccion = this.hunter.value.direction;

    let next = true;
    while (next) {
      let positionArrow: any = startPosition;
      switch (initDireccion) {
        case 'DOWN':  positionArrow.row = positionArrow.row+1 ; break;
        case 'UP':    positionArrow.row = positionArrow.row-1 ; break;
        case 'LEFT':  positionArrow.col = positionArrow.col-1 ; break;
        case 'RIGHT': positionArrow.col = positionArrow.col+1 ; break;
      } 
      if( (positionArrow.col >= 0 && positionArrow.col <= this.limitCaveMap) && 
          (positionArrow.row >= 0 && positionArrow.row <= this.limitCaveMap)
      ){
        this.positionArrow.next({...positionArrow});
      }else{
        next = false;
        alert('HAS FAllADO');
      }
    }

  }

  collectTheGold(){
    this.hunter.next({...this.hunter.value, inventory: [...'GOLD'] });
  }

  demise(){
    this.hunter.next({...this.hunter.value, itsAlive: false });
  }

}
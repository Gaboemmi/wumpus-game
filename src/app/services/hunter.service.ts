import { NotificationsService } from './notifications.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PositionDouble } from '../interfaces/custom.interface';
import { Hunter } from '../models/hunter.model';
import { DirectionMap } from '../types/custom.types';

@Injectable({
  providedIn: 'root'
})
export class HunterService {

  private hunter = new BehaviorSubject<Hunter>(new Hunter)
  $hunter = this.hunter.asObservable();

  private positionArrow = new BehaviorSubject<any>(null)
  $positionArrow = this.positionArrow.asObservable();

  limitCaveMap: number = 0;

  constructor(
    private notificationsService: NotificationsService
  ){}

  initHunter( amountOfArrows: any = 0, limitCaveMap: any = 1 ){
    this.hunter.next({...new Hunter(amountOfArrows)});
    this.positionArrow.next(null);
    this.limitCaveMap = limitCaveMap - 1;
  }

  turnLeft(){
    let direction: DirectionMap;
    switch (this.hunter.value.direction) {
      case 'DOWN':  direction = 'LEFT' ; break;
      case 'UP':    direction = 'RIGHT'; break;
      case 'LEFT':  direction = 'UP'   ; break;
      case 'RIGHT': direction = 'DOWN' ; break;
    } 
    this.hunter.next({...this.hunter.value, direction });
  }

  turnRight(){
    let direction: DirectionMap;
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
      case 'DOWN':  position.row = position.row + 1 ; break;
      case 'UP':    position.row = position.row - 1 ; break;
      case 'LEFT':  position.col = position.col - 1 ; break;
      case 'RIGHT': position.col = position.col + 1 ; break;
    } 
    if( (position.col >= 0 && position.col <= this.limitCaveMap) && 
        (position.row >= 0 && position.row <= this.limitCaveMap)
    ){
      this.hunter.next({...this.hunter.value, position:{...position} });
    }else{
      this.notificationsService.pushText('CHOQUE CON PARED');
    }
  }

  shootArrow(){

    const hunterArrows: number = this.hunter.value.arrows;

    if( hunterArrows <= 0 ){
      this.notificationsService.pushText('NO TIENES MAS FLECHAS');
      return;
    }

    this.hunter.next({...this.hunter.value, arrows: (hunterArrows - 1) });
    this.positionArrow.next({...this.hunter.value.position, direction: this.hunter.value.direction});
    
  }

  advanceArrowToNextCave(){
    let positionArrow = {...this.positionArrow.value};
    switch (this.positionArrow.value.direction) {
      case 'DOWN':  positionArrow.row = positionArrow.row + 1 ; break;
      case 'UP':    positionArrow.row = positionArrow.row - 1 ; break;
      case 'LEFT':  positionArrow.col = positionArrow.col - 1 ; break;
      case 'RIGHT': positionArrow.col = positionArrow.col + 1 ; break;
    } 
    if( (positionArrow.col >= 0 && positionArrow.col <= this.limitCaveMap) && 
        (positionArrow.row >= 0 && positionArrow.row <= this.limitCaveMap)
    ){
      this.positionArrow.next({...positionArrow});
    }else{
      this.notificationsService.pushText('HAS FAllADO');
    }
  }

  collectTheGold(){
    this.hunter.next({...this.hunter.value, inventory: ['GOLD'] });
  }

  getOut(){
    const inventory = [...this.hunter.value.inventory];
    const hunterPosition = {...this.hunter.value.position};
    if( inventory.includes('GOLD') && hunterPosition.col === 0 && hunterPosition.row === 0 ){
      this.hunter.next({...this.hunter.value, inMaze: false });
    }else{
      this.notificationsService.pushText('DEBES TENER EL ORO PARA PODER SALIR');
    }
  }

  demise(){
    this.hunter.next({...this.hunter.value, itsAlive: false });
  }

}
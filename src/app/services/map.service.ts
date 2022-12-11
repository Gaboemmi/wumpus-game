import { Cave } from './../models/cave.model';
import { Injectable } from '@angular/core';
import { PositionDouble } from '../interfaces/custom.interface';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: Cave[][] = [];
  caves: number = 0;
  pits: number = 0;
  isInitGame: boolean = false;

  constructor(
    private notificationsService: NotificationsService
  ) { }

  isInit(){
    return this.isInitGame;
  }

  initMap(caves: any = 4, pits: any = 1){
    this.isInitGame = true;
    this.caves = caves;
    this.pits = pits;
    this.notificationsService.pushText('_');
  }

  createMap(): Cave[][] {
    const newMap = [];
    for (let row = 0; row < this.caves; row++) {
      let newRow = [];
      for (let col = 0; col < this.caves; col++) 
        newRow.push( new Cave({col,row}) )
      newMap.push(newRow);
    }
    this.map = [...newMap];

    this.addWumpus_Stenchs();
    this.addPits_Breezes();
    this.addGold();

    return this.map
  }

  addWumpus_Stenchs(): void{

    let WumpusPosition!: PositionDouble;
    let isValid = false;

    while (!isValid) {
      WumpusPosition = {...this.generateRandomPositionDouble()};
      isValid = this.validatePosition( WumpusPosition, ['startPosition'] );
    }

    this.map[WumpusPosition.row][WumpusPosition.col].hasWumpus = true;
    this.addAdjacency(WumpusPosition,'hasStench');
  }

  addPits_Breezes(): void{

    let newPitsPosition!: PositionDouble;

    for (let index = 0; index < this.pits; index++) {
      
      let isValid = false;
      while (!isValid) {
        newPitsPosition = {...this.generateRandomPositionDouble()};
        isValid = this.validatePosition( newPitsPosition, ['startPosition', 'noWumpus', 'noPits'] );
      }

      this.map[newPitsPosition.row][newPitsPosition.col].hasPit = true;
      this.addAdjacency( newPitsPosition, 'hasBreeze' );
    }

  }

  addGold(){

    let newGoldPosition!: PositionDouble;
    let isValid = false;
    while (!isValid) {
      newGoldPosition = {...this.generateRandomPositionDouble()};
      isValid = this.validatePosition( newGoldPosition, ['startPosition', 'noPits'] );
    }

    this.map[newGoldPosition.row][newGoldPosition.col].hasGold = true;

  }

  addAdjacency( position: PositionDouble, key: 'hasStench'| 'hasBreeze'): void{
    if( position.col-1 >= 0 )
      this.map[position.row][position.col-1][key] = true;
    if( position.col+1 <= this.caves - 1 )
      this.map[position.row][position.col+1][key] = true;
    if( position.row-1 >= 0)
      this.map[position.row-1][position.col][key] = true;
    if( position.row+1 <= this.caves - 1 )
      this.map[position.row+1][position.col][key] = true;
  }

  generateRandomPositionDouble(): PositionDouble { 
    return {
      col: Math.round(Math.random() * (this.caves - 1)),
      row: Math.round(Math.random() * (this.caves - 1))
    }
  } 

  validatePosition( position: PositionDouble, rules: string[] = [] ){
    
    if( rules.includes('startPosition') ){
      if(position.col === 0 && position.row === 0) return false;
    }
    
    const caveInMap: Cave = this.map[position.row][position.col];

    if( rules.includes('noWumpus') ){
      if(caveInMap.hasWumpus) return false;
    }

    if( rules.includes('noPits') ){
      if(caveInMap.hasPit) return false;
    }

    return true;
  }

}
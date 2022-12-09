import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cave } from '../models/cave.model';
import { Hunter } from '../models/hunter.model';
import { HunterService } from '../services/hunter.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  map: Cave[][] = [];
  hunterSubscription!: Subscription;
  hunter!: Hunter;
  viewAllCaves: boolean = false;

  constructor(
    private mapService: MapService,
    private hunterService: HunterService,
  ) { }

  ngOnInit(): void {

    this.map = this.mapService.createMap();

    this.hunterSubscription = this.hunterService.$hunter.subscribe(
      (hunter:Hunter) => {
        this.hunter = hunter;
        if(hunter.itsAlive === false || hunter.inMaze === false){
          this.viewAllCaves = true;
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.hunterSubscription.unsubscribe();
  }

  goForward() :void {
    this.hunterService.goForward();
  }

  turnLeft() :void {
    this.hunterService.turnLeft();
  }

  turnRight() :void {
    this.hunterService.turnRight();
  }

  shootArrow() :void {
    this.hunterService.shootArrow();
  }

  getOutWithTheGold(){
    this.hunterService.getOut();
  }

}
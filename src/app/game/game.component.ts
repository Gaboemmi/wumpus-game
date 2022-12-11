import { NotificationsService } from './../services/notifications.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

// Models
import { Cave } from '../models/cave.model';

// Services
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
  hunter!: Hunter;
  viewAllCaves: boolean = false;
  $textBox! : Observable<string>;
  
  hunterSubscription!: Subscription;
  notySubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private hunterService: HunterService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {

    this.map = this.mapService.getMap();

    this.$textBox = this.notificationsService.$noty;

    this.hunterSubscription = this.hunterService.$hunter.subscribe(
      (hunter:Hunter) => {
        this.hunter = hunter;
        if(hunter.itsAlive === false || hunter.inMaze === false){
          this.viewAllCaves = true;
        }
      }
    )

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
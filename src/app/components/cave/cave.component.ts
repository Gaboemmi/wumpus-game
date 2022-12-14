import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';

// Models
import { Cave } from './../../models/cave.model';
import { Hunter } from 'src/app/models/hunter.model';
import { Wumpus } from 'src/app/models/wumpus.model';

// Services
import { HunterService } from 'src/app/services/hunter.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.css']
})
export class CaveComponent implements OnInit, OnDestroy {
  
  @Input() cave: Cave = new Cave;
  @Input() isVisible: boolean = false;

  hunter: Hunter | null = null;
  wumpus!: Wumpus;

  hunterSubscription!: Subscription;
  arrowSubscription!: Subscription;

  constructor(
    private hunterService: HunterService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {

    this.getObs();

    if( this.cave.hasWumpus ){
      this.wumpus = new Wumpus;
    }

  }

  getObs(){

    this.hunterSubscription = this.hunterService.$hunter.pipe(
      tap(() => this.hunter = null ),
      filter( (hunter:Hunter) => 
        ( hunter.position.col === this.cave.position.col && 
          hunter.position.row === this.cave.position.row &&
          hunter.itsAlive
        )
      )
    ).subscribe(
      (hunter:Hunter) => {
        this.isVisible = true;
        this.hunter = {...hunter};
        this.reviewCavePossibilities();
      }
    );

    this.arrowSubscription = this.hunterService.$positionArrow.pipe(
      filter( (resp:any) => resp !== null ),
      filter( (positionArrow:any) => 
        ( positionArrow.col === this.cave.position.col && positionArrow.row === this.cave.position.row )
      )
    ).subscribe(() => {
        if( this.cave.hasWumpus && this.wumpus.itsAlive){
          this.wumpus = {...this.wumpus, itsAlive: false};
          this.notificationsService.pushText('Se ha escuchado un grito');
        }else{
          this.hunterService.advanceArrowToNextCave();
        }
      }
    )

  }

  reviewCavePossibilities(){

    if( this.cave.hasGold ){
      this.cave.hasGold = false;
      this.hunterService.collectTheGold();
      this.notificationsService.pushText('HAS ENCONTRADO EL ORO');
      return
    }

    if( this.cave.hasWumpus ){
      if( this.wumpus?.itsAlive === true ){
        this.hunterService.demise();
        this.notificationsService.pushText('WUMPUS TE HA MATADO');
        return
      }else if(this.wumpus?.itsAlive === false){
        this.notificationsService.pushText('HAS MATADO AL WUMPUS');
        return
      }
    }

    if( this.cave.hasPit ){
      this.hunterService.demise();
      this.notificationsService.pushText('HAS CAIDO EN UN FOSO');
      return
    }

    this.notificationsService.pushText('_');
    
  }

  ngOnDestroy(): void {
    this.hunterSubscription.unsubscribe();
    this.arrowSubscription.unsubscribe();
  }

}

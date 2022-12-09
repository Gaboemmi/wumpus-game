import { Cave } from './../../models/cave.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HunterService } from 'src/app/services/hunter.service';
import { filter, map, Subscription, tap } from 'rxjs';
import { Hunter } from 'src/app/models/hunter.model';
import { Wumpus } from 'src/app/models/wumpus.model';
import { PositionDouble } from 'src/app/types/custom.types';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.css']
})
export class CaveComponent implements OnInit, OnDestroy {
  
  @Input() cave!: Cave;

  isVisible: boolean = false;
  hunter: Hunter | null = null;
  wumpus!: Wumpus;
  showArrow: boolean = false;

  hunterSubscription!: Subscription;
  arrowSubscription!: Subscription;

  constructor(
    private hunterService: HunterService
  ) { }

  ngOnInit(): void {

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
      tap(() => this.showArrow = false ),
      filter( (resp:any) => resp !== null ),
      filter( (positionArrow:any) => 
        ( positionArrow.col === this.cave.position.col && positionArrow.row === this.cave.position.row )
      )
    )
    .subscribe(
      (position:PositionDouble|null) => {
        this.showArrow = true;
        if( this.cave.hasWumpus ){
          this.wumpus.itsAlive = false;
          alert('MATASTE A WUMPUS')
        }
      }
    )

    if( this.cave.hasWumpus ){
      this.wumpus = new Wumpus;
    }

  }

  reviewCavePossibilities(){

    if( this.cave.hasGold ){
      this.cave.hasGold = false;
      this.hunterService.collectTheGold();
      alert('HAS ENCONTRADO EL ORO')
    }

    if( this.cave.hasWumpus ){
      if( this.wumpus?.itsAlive ){
        this.hunterService.demise();
        alert('WUMPUS TE HA MATADO')
      }
    }

    if( this.cave.hasPit ){
      this.hunterService.demise();
      alert('HAS CAIDO EN UN FOSO')
    }
    
  }

  ngOnDestroy(): void {
    this.hunterSubscription.unsubscribe();
    this.arrowSubscription.unsubscribe();
  }

}

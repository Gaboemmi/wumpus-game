import { Component, OnInit } from '@angular/core';
import { Cave } from '../models/cave.model';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  map: Cave[][] = [];

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
    this.map = this.mapService.createMap();
  }

}

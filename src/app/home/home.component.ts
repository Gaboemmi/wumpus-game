import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HunterService } from '../services/hunter.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private hunterService: HunterService,
    private mapService: MapService,
    private router: Router,
  ) { }

  public gameForm = this.fb.group({
    caves:  [8, [ Validators.required, Validators.min(4), Validators.max(20) ] ],
    pits:   [6, [ Validators.required, Validators.min(2), Validators.max(20) ] ],
    arrows: [2, [ Validators.required, Validators.min(0), Validators.max(5) ] ],
  });

  ngOnInit(): void {}

  startGame(){
    if( this.gameForm.invalid ){ return; }
    const { caves, arrows, pits } = this.gameForm.value;
    this.mapService.initMap(caves,pits);
    this.hunterService.initHunter(arrows);
    this.router.navigate(['/game']);
  }

}

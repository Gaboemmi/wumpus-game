import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { HunterService } from '../services/hunter.service';
import { MapService } from '../services/map.service';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gameForm = this.fb.group({
    caves:  [8, [ Validators.required, Validators.min(4), Validators.max(50) ] ],
    pits:   [6, [ Validators.required, Validators.min(2), Validators.max(30) ] ],
    arrows: [2, [ Validators.required, Validators.min(0), Validators.max(5)  ] ],
  });

  constructor(
    private fb: FormBuilder,
    private hunterService: HunterService,
    private mapService: MapService,
    private notificationsService: NotificationsService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  get caves(){
    return this.gameForm.get('caves');
  }

  get pits(){
    return this.gameForm.get('pits');
  }

  get arrows(){
    return this.gameForm.get('arrows');
  }

  startGame(){
    
    if( this.gameForm.invalid ){ return; }

    const { caves, arrows, pits } = this.gameForm.value;

    this.hunterService.initHunter(arrows,caves);
    this.mapService.initMap(caves,pits);
    this.notificationsService.initText();

    this.router.navigate(['/game']);
    
  }

}

import { Cave } from './../../models/cave.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.css']
})
export class CaveComponent implements OnInit {

  isVisible: boolean = true;

  hunter: any | null;

  @Input() cave: Cave = new Cave;

  constructor() { }

  ngOnInit(): void {
  }

}

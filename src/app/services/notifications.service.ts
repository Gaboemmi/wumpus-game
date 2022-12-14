import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private noty = new BehaviorSubject<string>('_')
  public $noty = this.noty.asObservable();

  constructor() { }

  initText(){
    this.noty.next('_');
  }

  pushText( string: string){
    this.noty.next(string);
  }

}

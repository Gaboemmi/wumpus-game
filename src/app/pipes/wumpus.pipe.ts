import { Wumpus } from 'src/app/models/wumpus.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wumpusImg'
})
export class WumpusPipe implements PipeTransform {
  transform(wumpus: Wumpus): string {
    if(wumpus.itsAlive === true){
      return `assets/img/wumpus/wumpus.png`;
    }else{
      return `assets/img/wumpus/wumpus_dead.png`;
    }
  }
}

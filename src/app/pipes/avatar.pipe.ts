import { DirectionHunter } from './../types/custom.types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(direction: DirectionHunter): string {
    return `assets/img/hunter/hunter_${direction.toLowerCase()}.png`;
  }
}

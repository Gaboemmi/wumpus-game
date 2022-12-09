import { DirectionMap } from './../types/custom.types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {
  transform(direction: DirectionMap): string {
    return `assets/img/hunter/hunter_${direction.toLowerCase()}.png`;
  }
}

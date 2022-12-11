import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaveComponent } from './cave/cave.component';
import { AvatarPipe } from '../pipes/avatar.pipe';
import { WumpusPipe } from '../pipes/wumpus.pipe';

@NgModule({
  declarations: [
    CaveComponent,
    AvatarPipe,
    WumpusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CaveComponent
  ]
})
export class ComponentsModule { }

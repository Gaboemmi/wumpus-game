import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaveComponent } from './cave/cave.component';
import { AvatarPipe } from '../pipes/avatar.pipe';

@NgModule({
  declarations: [
    CaveComponent,
    AvatarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CaveComponent
  ]
})
export class ComponentsModule { }

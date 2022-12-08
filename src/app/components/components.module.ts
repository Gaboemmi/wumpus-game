import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaveComponent } from './cave/cave.component';



@NgModule({
  declarations: [
    CaveComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CaveComponent
  ]
})
export class ComponentsModule { }

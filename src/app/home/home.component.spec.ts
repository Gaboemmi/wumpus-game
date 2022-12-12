import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HunterService } from '../services/hunter.service';
import { MapService } from '../services/map.service';
import { NotificationsService } from '../services/notifications.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debe crear un formulario con 3 campos', () => {
    expect(component.gameForm.contains('caves')).toBeTruthy();
    expect(component.gameForm.contains('pits')).toBeTruthy();
    expect(component.gameForm.contains('arrows')).toBeTruthy();
  });

  it('El campo celdas debe ser obligatorio', () => {
    const control = component.gameForm.get('caves');
    control?.setValue(null);
    expect(control?.valid).toBeFalsy();
  });

  it('El campo fosas debe ser obligatorio', () => {
    const control = component.gameForm.get('pits');
    control?.setValue(null);
    expect(control?.valid).toBeFalsy();
  });

  it('El campo flechas debe ser obligatorio', () => {
    const control = component.gameForm.get('arrows');
    control?.setValue(null);
    expect(control?.valid).toBeFalsy();
  });

});

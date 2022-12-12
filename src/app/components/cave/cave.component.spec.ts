import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cave } from 'src/app/models/cave.model';
import { Hunter } from 'src/app/models/hunter.model';
import { AvatarPipe } from 'src/app/pipes/avatar.pipe';
import { WumpusPipe } from 'src/app/pipes/wumpus.pipe';
import { HunterService } from 'src/app/services/hunter.service';

import { CaveComponent } from './cave.component';

describe('CaveComponent', () => {
  let component: CaveComponent;
  let fixture: ComponentFixture<CaveComponent>;
  let hunterService: HunterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CaveComponent, 
        AvatarPipe, 
        WumpusPipe 
      ],
      providers: [
        HunterService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    hunterService = TestBed.inject(HunterService)

  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Mostrar celda cuando el cazador se encuentre en ella', () => {
    component.cave = { ...new Cave, position: {col: 2, row: 2} }
    hunterService.updateHunter({...new Hunter, position: {col: 2, row: 2}});
    component.ngOnInit();
    expect(component.isVisible).toBeTrue()
  });

  it('El casador debe coger el Oro si se encuentra en la celda', () => {
    component.cave = { ...new Cave, position: {col: 2, row: 2}, hasGold: true }
    hunterService.updateHunter({...new Hunter, position: {col: 2, row: 2}});
    component.ngOnInit();
    expect( component.hunter?.inventory.includes('GOLD') ).toBeTrue()
  });

  it('El casador debe morir si se encuentra el Wumpus vivo', () => {
    component.cave = { ...new Cave, position: {col: 2, row: 2}, hasWumpus: true }
    component.ngOnInit();
    hunterService.updateHunter({...new Hunter, position: {col: 2, row: 2}});
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.itsAlive ).toBeFalse()
    );
  });

  it('El casador debe morir si hay un foso', () => {
    component.cave = { ...new Cave, position: {col: 2, row: 2}, hasPit: true }
    component.ngOnInit();
    hunterService.updateHunter({...new Hunter, position: {col: 2, row: 2}});
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.itsAlive ).toBeFalse()
    );
  });

});

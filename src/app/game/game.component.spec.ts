import { HunterService } from 'src/app/services/hunter.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapService } from '../services/map.service';

import { GameComponent } from './game.component';
import { NotificationsService } from '../services/notifications.service';
import { Hunter } from '../models/hunter.model';
import { filter } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mapService: MapService;
  let hunterService: HunterService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      providers: [ 
        MapService,
        HunterService,
        NotificationsService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mapService = TestBed.inject(MapService)
    hunterService = TestBed.inject(HunterService)
    notificationsService = TestBed.inject(NotificationsService)

    const cells = 8
    const pits = 6
    const arrows = 2

    mapService.initMap(cells,pits);
    hunterService.initHunter(arrows,cells);

  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
    expect(component.map.length).toBe(0);
  });

  it('Init: Debe de cargar el mapa', () => {
    component.ngOnInit();
    expect( component.map.length ).toBeGreaterThan(0);
  });

  it('El cazador debe avanzar al llamar la funcion goForward', () => {
    hunterService.updateHunter({...new Hunter, position: {col: 0, row: 0}, direction: 'DOWN'});
    component.goForward();
    hunterService.$hunter.subscribe( (hunter:Hunter) => {
        expect( hunter.position.col ).toBe(0);
        expect( hunter.position.row ).toBe(1);
        expect( hunter.direction ).toBe('DOWN');
      }
    );
  });

  it('El cazador debe chocar con pared al llamar la funcion goForward', () => {
    hunterService.updateHunter({...new Hunter, position: {col: 0, row: 0}, direction: 'LEFT'});
    component.goForward();
    hunterService.$hunter.subscribe( (hunter:Hunter) => {
        expect( hunter.position.col ).toBe(0);
        expect( hunter.position.row ).toBe(0);
        expect( hunter.direction ).toBe('LEFT');
      }
    );
    notificationsService.$noty.subscribe( (text:string) => {
        expect( text ).toBe('CHOQUE CON PARED');
      }
    );
  });

  it('El cazador debe girar a la izquierda al llamar la funcion turnLeft', () => {
    hunterService.updateHunter({...new Hunter, direction: 'DOWN'});
    component.turnLeft();
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.direction ).toBe('LEFT')
    );
  });

  it('El cazador debe girar a la derecha al llamar la funcion turnRight', () => {
    hunterService.updateHunter({...new Hunter, direction: 'DOWN'});
    component.turnRight();
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.direction ).toBe('RIGHT')
    );
  });

  it('El cazador debe lanzar flecha al llamar la funcion shootArrow', () => {
    hunterService.updateHunter({...new Hunter, arrows: 2});
    component.shootArrow();
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.arrows ).toBe(1)
    );
  });

  it('El cazador No debe lanzar flecha al llamar la funcion shootArrow cuando NO tiene flechas', () => {
    hunterService.updateHunter({...new Hunter, arrows: 0});
    component.shootArrow();
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.arrows ).toBe(0)
    );
    notificationsService.$noty.subscribe( (text:string) => {
        expect( text ).toBe('NO TIENES MAS FLECHAS');
      }
    );
  });

  it('El cazador NO debe salir de la cueva al llamar la funcion getOutWithTheGold cuando NO tiene el Oro', () => {
    hunterService.updateHunter({...new Hunter, inMaze: true, position: {col: 0, row: 0} , inventory: []});
    component.getOutWithTheGold();
    notificationsService.$noty.subscribe( (text:string) => {
      expect( text ).toBe('DEBES TENER EL ORO PARA PODER SALIR');
    }
  );
  });

  it('El cazador debe salir de la cueva al llamar la funcion getOutWithTheGold cuando SI tiene el Oro', () => {
    hunterService.updateHunter({...new Hunter, inMaze: true, position: {col: 0, row: 0} , inventory: ['GOLD']});
    component.getOutWithTheGold();
    hunterService.$hunter.subscribe(
      (hunter) => expect( hunter.inMaze ).toBe(false)
    );
  });


});

import { MapService } from './../services/map.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InitGameGuard implements CanActivate {

  constructor(
    private mapService: MapService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.mapService.isInit()) {
      return this.router.parseUrl('/home');
    } else {
      return true;
    }
  }
  
}

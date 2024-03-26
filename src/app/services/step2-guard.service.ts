import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TeslaService } from './tesla.service';

@Injectable({
  providedIn: 'root'
})
export class Step2GuardService implements CanActivate {

  constructor(private router: Router, public teslaService: TeslaService) { }

  canActivate(): boolean {
    if (this.teslaService.selectedModel === undefined) {
      this.router.navigate(['/step1']);
      return false;
    }
    return true;
  }
}

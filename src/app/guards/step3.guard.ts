import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TeslaService } from '../services/tesla.service';

export const step3Guard: CanActivateFn = (route, state) => {
  const teslaService = inject(TeslaService);
  const router = inject(Router);
  if (teslaService.selectedOptions.selectedModel === undefined) {
    router.navigate(['/step1']);
    return false;
  } else if (teslaService.selectedOptions.selectedConfig === undefined) {
    router.navigate(['/step2']);
    return false;
  }
  return true;
};

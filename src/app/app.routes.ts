import { Routes } from '@angular/router';

import { Step1Component } from './steps/step1/step1.component';
import { step2Guard } from './guards/step2.guard';
import { step3Guard } from './guards/step3.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: 'step1', component: Step1Component },
  {
    path: 'step2',
    loadComponent: () => import('./steps/step2/step2.component').then(m => m.Step2Component),
    canActivate: [step2Guard]
  },
  {
    path: 'step3',
    loadComponent: () => import('./steps/step3/step3.component').then(m => m.Step3Component),
    canActivate: [step3Guard]
  }
];

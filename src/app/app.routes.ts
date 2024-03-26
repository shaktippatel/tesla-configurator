import { Routes } from '@angular/router';

import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step2GuardService } from './services/step2-guard.service';
import { Step3GuardService } from './services/step3-guard.service';


export const routes: Routes = [
  { path: '', redirectTo: '/step1', pathMatch: 'full' },
  { path: 'step1', component: Step1Component },
  { path: 'step2', component: Step2Component, canActivate: [Step2GuardService] },
  { path: 'step3', component: Step3Component, canActivate: [Step3GuardService] },
];

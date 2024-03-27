import { Component } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { TeslaOptions } from '../../models/tesla-options.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
  selectedOptions!: TeslaOptions;
  selectedOptionsSubject?: TeslaOptions;
  selectedOptionsSubscription?: Subscription;

  constructor(public teslaService: TeslaService) {
    this.selectedOptionsSubscription = this.teslaService.selectedOptionsSubject.subscribe(selectedOptions => {
      this.selectedOptions = selectedOptions;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.selectedOptionsSubscription?.unsubscribe();
  }
}

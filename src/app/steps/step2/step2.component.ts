import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { Tesla } from '../../models/tesla.model';
import { Color } from '../../models/color.model';
import { Config } from '../../models/config.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  models: Tesla[] = [];
  modelColors: Color[] = [];

  private modelSubscription: Subscription | undefined;

  configs: Config[] = [];
  includeYoke: boolean = false;
  includeTow: boolean = false;

  constructor(public teslaService: TeslaService) { }

  ngOnInit(): void {
    this.modelSubscription = this.teslaService.getOptions(this.teslaService.selectedModel.code).subscribe(data => {
      this.configs = data.configs;
      this.includeYoke = data.yoke;
      this.includeTow = data.towHitch;

      this.getSelectedConfig();
    });
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }

  getSelectedConfig() {
    const selectedConfig = this.configs.find(config => config.id === this.teslaService.selectedConfig?.id);

    if(selectedConfig) {
      this.teslaService.selectedConfig = selectedConfig;
    }
  }

}

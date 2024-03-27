import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { Tesla } from '../../models/tesla.model';
import { Color } from '../../models/color.model';
import { Config } from '../../models/config.model';
import { Subscription } from 'rxjs';
import { Options } from '../../models/options.model';
import { TeslaOptions } from '../../models/tesla-options.model';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss'
})
export class Step2Component {
  configs: Config[] = [];
  includeYoke: boolean = false;
  includeTow: boolean = false;

  private modelSubscription: Subscription | undefined;

  selectedOptions!: TeslaOptions;
  selectedOptionsSubject?: TeslaOptions;
  selectedOptionsSubscription?: Subscription;
  selectedConfig?: Config;

  constructor(public teslaService: TeslaService) {
    this.selectedOptionsSubscription = this.teslaService.selectedOptionsSubject.subscribe(selectedOptions => {
      this.selectedOptions = selectedOptions;
      this.getOptions(selectedOptions?.selectedModel?.code);
    });
  }

  ngOnInit(): void {}

  private getOptions(modelCode: string = '') {
    this.modelSubscription = this.modelSubscription = this.teslaService.getOptions(modelCode).subscribe((data: Options) => {
      this.configs = data.configs;
      this.includeYoke = data.yoke;
      this.includeTow = data.towHitch;

      this.selectedConfig = this.configs.find(config => config.id === this.selectedOptions.selectedConfig?.id);
    });
  }

  setConfig(selectedConfig?: Config) {
    this.teslaService.setConfig(selectedConfig);
  }

  setIncludeTow(includeTow: boolean = false) {
    this.teslaService.setIncludeTow(includeTow);
  }

  setIncludeYoke(includeYoke: boolean = false) {
    this.teslaService.setIncludeYoke(includeYoke);
  }

  ngOnDestroy(): void {
    this.modelSubscription?.unsubscribe();
    this.selectedOptionsSubscription?.unsubscribe();
  }

}

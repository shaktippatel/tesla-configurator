import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TeslaService } from './services/tesla.service';
import { TeslaOptions } from './models/tesla-options.model';
import { Tesla } from './models/tesla.model';
import { Subscription } from 'rxjs';
import { Config } from './models/config.model';
import { Color } from './models/color.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, CommonModule],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  name = 'Angular';

  imageBaseUrl: string = "https://interstate21.com/tesla-app/images/";
  imageUrl?: string;

  selectedModel?: Tesla;
  selectedColor?: Color;
  selectedConfig?: Config

  selectedOptionsSubject?: TeslaOptions;
  selectedOptionsSubscription?: Subscription;

  constructor(public teslaService: TeslaService) { }

  ngOnInit(): void {
    this.selectedOptionsSubscription = this.teslaService.selectedOptionsSubject.subscribe(selectedOptions => {
      this.selectedModel = selectedOptions?.selectedModel;
      this.selectedConfig = selectedOptions?.selectedConfig;
      this.selectedColor = selectedOptions?.selectedColor;

      if(this.selectedModel !== undefined && this.selectedColor) {
        this.imageUrl = this.imageBaseUrl + this.selectedModel.code.toUpperCase() + "/" + this.selectedColor.code.toLowerCase() + ".jpg";
      } else {
        this.imageUrl = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedOptionsSubscription?.unsubscribe();
  }

}

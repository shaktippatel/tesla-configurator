import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { Tesla } from '../../models/tesla.model';
import { Color } from '../../models/color.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component {
  models: Tesla[] = [];
  modelColors: Color[] = [];

  private modelSubscription: Subscription | undefined;

  constructor(public teslaService: TeslaService) { }

  ngOnInit(): void {
    this.modelSubscription = this.teslaService.getModels().subscribe(data => {
      this.models = data;
      this.getSelectedModelColors();
    });
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }


  getSelectedModelColors(reset: boolean = false) {
    const selectedModel = this.models.find(model => model.code === this.teslaService.selectedModel?.code);

    if(selectedModel) {
      this.teslaService.selectedModel = selectedModel;
      this.modelColors = selectedModel ? selectedModel.colors : [];
    }

    const selectedColor = this.modelColors.find(modelColors => modelColors.code === this.teslaService.selectedColor?.code);
    if(selectedColor) {
      this.teslaService.selectedColor = selectedColor;
    } else if (selectedColor === undefined && this.modelColors.length > 0) {
      this.teslaService.selectedColor = this.modelColors[0];
    }

    if(reset === true) {
      this.teslaService.selectedConfig = undefined;
      this.teslaService.includeYoke = false;
      this.teslaService.includeTow = false;
    }
  }

}

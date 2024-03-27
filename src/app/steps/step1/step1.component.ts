import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';
import { Tesla } from '../../models/tesla.model';
import { Color } from '../../models/color.model';
import { Subscription, take } from 'rxjs';
import { TeslaOptions } from '../../models/tesla-options.model';

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

  selectedModel?: Tesla;
  selectedColor!: Color;

  selectedOptionsSubject?: TeslaOptions;
  selectedOptionsSubscription?: Subscription;

  constructor(public teslaService: TeslaService) {
    this.modelSubscription = this.teslaService.getModels().subscribe((data: Tesla[]) => {
      this.models = data;
      this.getSelectedModel();
    });
  }

  ngOnInit(): void { }

  getSelectedModel() {
    this.selectedOptionsSubscription = this.teslaService.selectedOptionsSubject.subscribe(selectedOptions => {
      this.selectedModel = this.models.find(model => model.code === selectedOptions?.selectedModel?.code)
      this.modelColors = this.selectedModel?.colors || [];

      const selectedColor = this.modelColors.find(modelColors => modelColors.code === selectedOptions.selectedColor?.code);
      if (selectedColor !== undefined) {
        this.selectedColor = selectedColor;
      } else if (selectedColor === undefined && this.modelColors.length > 0) {
        this.selectedColor = this.modelColors[0];
      }
    });
  }

  setModel(selectedModel?: Tesla) {
    let selectedColor;
    if(selectedModel === undefined) {
      selectedColor = undefined;
    } else if(selectedModel.colors.length) {
      selectedColor = selectedModel.colors[0];
    }
    this.teslaService.setModel(selectedModel, selectedColor);
  }

  setColor(selectedColor: Color) {
    this.teslaService.setColor(selectedColor);
  }

  ngOnDestroy(): void {
    this.modelSubscription?.unsubscribe();
    this.selectedOptionsSubscription?.unsubscribe();
  }
}

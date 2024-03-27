import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tesla } from '../models/tesla.model';
import { Color } from '../models/color.model';
import { Config } from '../models/config.model';
import { Options } from '../models/options.model';
import { TeslaOptions } from '../models/tesla-options.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  private baseUrl = '';

  selectedOptions: TeslaOptions = {
    includeYoke: false,
    includeTow: false
  };
  selectedOptionsSubject = new BehaviorSubject<TeslaOptions>(this.selectedOptions);

  constructor(private http: HttpClient) { }

  getModels(): Observable<Tesla[]> {
    return this.http.get<Tesla[]>(`${this.baseUrl}/models`);
  }

  getOptions(modelCode: string): Observable<Options> {
    return this.http.get<Options>(`${this.baseUrl}/options/${modelCode}`);
  }

  setModel(selectedModel?: Tesla, selectedColor?: Color) {
    this.selectedOptions.selectedModel = selectedModel;
    this.selectedOptions.selectedColor = selectedColor;
    delete this.selectedOptions.selectedConfig;
    this.selectedOptions.includeYoke = false;
    this.selectedOptions.includeTow = false;
    this.emitSelectedOption();
  }

  setColor(selectedColor: Color) {
    this.selectedOptions.selectedColor = selectedColor;
    this.emitSelectedOption();
  }

  setConfig(selectedConfig?: Config) {
    this.selectedOptions.selectedConfig = selectedConfig;
    this.emitSelectedOption();
  }

  setIncludeTow(includeTow: boolean = false) {
    this.selectedOptions.includeTow = includeTow;
    this.emitSelectedOption();
  }

  setIncludeYoke(includeYoke: boolean = false) {
    this.selectedOptions.includeYoke = includeYoke;
    this.emitSelectedOption();
  }

  emitSelectedOption() {
    this.selectedOptionsSubject.next(this.selectedOptions);
  }
}

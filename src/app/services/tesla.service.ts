import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tesla } from '../models/tesla.model';
import { Color } from '../models/color.model';
import { Config } from '../models/config.model';
import { Options } from '../models/options.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaService {
  private baseUrl = '';

  selectedModel!: Tesla;
  selectedColor!: Color;

  selectedConfig?: Config;
  includeYoke: boolean = false;
  includeTow: boolean = false;

  constructor(private http: HttpClient) { }

  getModels(): Observable<Tesla[]> {
    return this.http.get<Tesla[]>(`${this.baseUrl}/models`);
  }

  getOptions(modelCode: string): Observable<Options> {
    return this.http.get<Options>(`${this.baseUrl}/options/${modelCode}`);
  }
}

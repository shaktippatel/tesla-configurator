import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TeslaService } from './services/tesla.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterOutlet, RouterLink, CommonModule],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  name = 'Angular';


  constructor(public teslaService: TeslaService) { }

  ngOnInit(): void {
  }

}

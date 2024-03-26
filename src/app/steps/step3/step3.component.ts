import { Component } from '@angular/core';
import { TeslaService } from '../../services/tesla.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss'
})
export class Step3Component {
constructor(public teslaService: TeslaService) { }

  ngOnInit(): void {
   console.log(this.teslaService);

  }


}

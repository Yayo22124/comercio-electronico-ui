import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'ce-info-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() title: string = 'Title';
  @Input() content: string = 'Content';
}

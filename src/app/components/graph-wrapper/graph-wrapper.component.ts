import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'ce-graph-wrapper',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './graph-wrapper.component.html',
  styleUrl: './graph-wrapper.component.scss'
})
export class GraphWrapperComponent {
  @Input() title: string = 'Title';
}

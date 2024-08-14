import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'ce-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}

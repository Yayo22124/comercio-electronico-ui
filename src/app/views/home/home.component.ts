import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ApiService } from '../../core/api.service';
import { Product } from '../../core/types/api';

@Component({
  selector: 'ce-home',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  public products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe((res: Product[]) => this.products = res, (err) => console.error(err));
  }
}

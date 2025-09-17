import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/productService';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';

  constructor(private ps: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe(list => {
      this.products = list;
      this.filtered = list;
      this.categories = Array.from(new Set(list.map(p => p.category)));
    });
  }

  filter() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filtered = this.products.filter(p =>
      (this.selectedCategory ? p.category === this.selectedCategory : true) &&
      (term ? (p.title + ' ' + p.description).toLowerCase().includes(term) : true)
    );
  }

  addToCart(p: Product) {
    this.cart.addToCart(p, 1);
    // optional: show a toast/snackbar (later)
  }
}

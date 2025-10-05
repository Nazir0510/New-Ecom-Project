import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/productService';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit{
  product?: Product;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getProduct(id).subscribe((p) => (this.product = p));
  }

  addToCart() {
    if (this.product) this.cart.addToCart(this.product, this.qty);
  }
}

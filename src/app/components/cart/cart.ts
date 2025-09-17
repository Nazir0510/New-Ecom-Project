import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cartService';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{
  items: CartItem[] = [];
  total = 0;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.cart$.subscribe(it => {
      this.items = it;
      this.total = this.cart.getTotal();
    });
  }

  updateQty(item: CartItem) {
    if (item.quantity <= 0) {
      this.remove(item.product.id);
      return;
    }
    this.cart.updateQuantity(item.product.id, item.quantity);
  }

  remove(id: number) {
    this.cart.remove(id);
  }
}

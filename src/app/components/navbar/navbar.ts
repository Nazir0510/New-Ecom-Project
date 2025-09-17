import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cartCount$: Observable<number>;

  constructor(private cart: CartService) {
    this.cartCount$ = this.cart.cart$.pipe(
      map((items) => items.reduce((s, it) => s + it.quantity, 0))
    );
  }
}

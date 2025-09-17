import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
   private storageKey = 'ecom_cart_v1';
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  cart$ = this.cartSubject.asObservable();

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  getItems(): CartItem[] {
    return this.cartSubject.getValue();
  }

  addToCart(product: Product, qty = 1) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx].quantity += qty;
    } else {
       items.push({ product, quantity: qty });
    }
    this.cartSubject.next(items);
    this.saveToStorage(items);
  }

  updateQuantity(productId: number, quantity: number) {
    let items = this.getItems().map(i => i.product.id === productId ? { ...i, quantity } : i);
    items = items.filter(i => i.quantity > 0);
    this.cartSubject.next(items);
    this.saveToStorage(items);
  }

  remove(productId: number) {
    const items = this.getItems().filter(i => i.product.id !== productId);
    this.cartSubject.next(items);
    this.saveToStorage(items);
  }

  clearCart() {
    this.cartSubject.next([]);
    this.saveToStorage([]);
  }

  getTotal(): number {
    return this.getItems().reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }
}

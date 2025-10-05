import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cartService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  checkoutForm; 
  success = false;
  
  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private router: Router )
  {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      payment: ['cod'], // just demo
    });
  }

  onSubmit() {
    if (this.checkoutForm.invalid) return;
    // Here you would send order to backend. For now, show success + clear cart.
    this.success = true;
    this.cart.clearCart();

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }
}

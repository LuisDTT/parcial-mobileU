import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment-loader',
  templateUrl: './payment-loader.page.html',
  styleUrls: ['./payment-loader.page.scss'],
  standalone: false,
})
export class PaymentLoaderPage implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/transaction-summary'], {
        state: {
          transactionData: this.cartService.getLastTransaction(),
        },
      });
    }, 3000);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage {
  cartItems: Observable<CartItem[]>;
  total: Observable<number>;
  showCheckoutForm = false;
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', []],
      email: ['', []],
      address: ['', []],
      cardNumber: ['', []],
      expiry: ['', []],
      cvv: ['', []],
    });
    this.cartItems = this.cartService.getCart();

    this.total = this.cartItems.pipe(
      map((items: CartItem[]) =>
        items.reduce(
          (acc: number, item: CartItem) =>
            acc + item.product.price * item.quantity,
          0,
        ),
      ),
    );
  }

  async submitPayment() {
    if (this.checkoutForm.invalid) return;

    const transactionData = {
      customerInfo: {
        ...this.checkoutForm.value,

        cardNumber: this.checkoutForm.value.cardNumber.replace(/\s/g, ''),
        expiry: this.checkoutForm.value.expiry.padStart(5, '0'),
      },
      total: this.cartService.getCartTotal(),
      date: new Date(),
    };

    this.cartService.setLastTransaction(transactionData);
    this.showCheckoutForm = false;
    this.checkoutForm.reset();
    this.cartService.clearCart();
    this.router.navigate(['/payment-loader']);
  }

  cancelCheckout() {
    this.showCheckoutForm = false;
    this.checkoutForm.reset();
  }

  updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity < 1 || isNaN(newQuantity)) return;
    this.cartService.updateQuantity(productId, newQuantity);
  }

  handleQuantityChange(productId: number, event: CustomEvent) {
    const newQuantity = Number((event.target as HTMLInputElement).value);
    this.updateQuantity(productId, newQuantity);
  }

  async removeFromCart(productId: number) {
    const productName = this.getProductName(productId);
    this.cartService.removeFromCart(productId);
    await this.showDeleteToast(productName);
  }

  private getProductName(productId: number): string {
    const item = this.cartService['cartItems'].value.find(
      (i) => i.product.id === productId,
    );
    return item?.product.title || 'Producto';
  }

  private async showDeleteToast(productName: string) {
    const toast = await this.toastController.create({
      message: `${productName} eliminado del carrito`,
      duration: 2000,
      position: 'top',
      color: 'danger',
      icon: 'trash',
      buttons: [
        {
          text: 'Deshacer',
          handler: () => {
            this.cartService.restoreLastItem();
          },
        },
      ],
    });

    await toast.present();
  }
}

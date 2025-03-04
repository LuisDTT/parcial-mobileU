import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private storageKey = 'cart';
  private previousState: CartItem[] = [];
  private lastTransaction: any;

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem(this.storageKey);
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItems.next(items);
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }
  setLastTransaction(data: any) {
    this.lastTransaction = data;
  }

  getLastTransaction() {
    return this.lastTransaction;
  }

  getCart() {
    return this.cartItems.asObservable();
  }

  addToCart(product: any, quantity: number = 1) {
    const currentCart = [...this.cartItems.value];
    const existingItem = currentCart.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.saveCart(currentCart);
  }

  removeFromCart(productId: number) {
    this.previousState = [...this.cartItems.value];
    const updatedCart = this.cartItems.value.filter(
      (item) => item.product.id !== productId,
    );
    this.saveCart(updatedCart);
  }

  updateQuantity(productId: number, newQuantity: number) {
    const updatedCart = this.cartItems.value.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    this.saveCart(updatedCart);
  }

  clearCart() {
    this.saveCart([]);
  }

  restoreLastItem() {
    this.saveCart(this.previousState);
  }

  getTotal() {
    return this.cartItems.value.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false,
})
export class ProductDetailPage implements OnInit {
  product: any;
  loading: boolean = true;
  cartItemCount = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private cartService: CartService,
    private toastController: ToastController,
  ) {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    } else {
      this.router.navigateByUrl('/home');
      this.loading = false;
    }
  }

  async addToCart() {
    this.cartService.addToCart(this.product);
    await this.showToast();
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: '¡Producto agregado al carrito!',
      duration: 2000,
      position: 'top',
      color: 'success',
      icon: 'cart',
      buttons: [
        {
          text: 'Ver carrito',
          handler: () => {
            this.router.navigate(['/cart']);
          },
        },
      ],
    });

    await toast.present();
  }

  async loadProduct(id: string) {
    try {
      this.product = await this.apiService.getProductById(id).toPromise();
      this.loading = false;
    } catch (error) {
      console.error('Error loading product:', error);
      this.loading = false;
    }
  }
}

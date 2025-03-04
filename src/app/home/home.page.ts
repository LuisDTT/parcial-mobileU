import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
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
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  categories: string[] = [];
  selectedCategory: string | null = null;
  productsList: Product[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  sortOptions = [
    { value: 'asc', label: 'Ascendente' },
    { value: 'desc', label: 'Descendente' },
  ];
  cartItemCount = 0;

  constructor(
    private productService: ApiService,
    private cartService: CartService,
  ) {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    });
  }
  ngOnInit() {
    this.loadCategories();
    this.loadAllProducts();
  }

  changeSortOrder() {
    console.log(this.sortOrder);
    this.productService
      .getSortedProducts(this.sortOrder, this.selectedCategory)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.productsList = data;
        },
        error: (error) => {
          console.error('Error al obtener los productos:', error);
        },
      });
  }

  onCategoryChange() {
    console.log('Categoría seleccionada:', this.selectedCategory);
    if (!this.selectedCategory) {
      this.loadAllProducts();
    } else {
      this.productService
        .getProductsByCategory(this.selectedCategory)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.productsList = data;
          },
          error: (error) => {
            console.error('Error al obtener los productos:', error);
          },
        });
    }
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.productsList = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      },
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (data: any) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      },
    });
  }

  formatCategoryName(category: string): string {
    return category.replace(/'/g, '').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

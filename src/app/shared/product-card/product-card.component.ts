import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false,
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    title: '',
    category: '',
    image: '',
    price: 0,
    description: '',
    rating: {
      count: 0,
      rate: 2,
    },
    id: 0,
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  viewProduct() {
    this.router.navigate(['/product', this.product.id]);
  }
}

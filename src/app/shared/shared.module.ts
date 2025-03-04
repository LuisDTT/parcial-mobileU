import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './splash/splash.component';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [SplashComponent, ProductCardComponent, ProductListComponent],
  imports: [CommonModule, IonicModule],
  exports: [SplashComponent, ProductCardComponent, ProductListComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './shared/splash/splash.component';

const routes: Routes = [
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule,
      ),
  },
  {
    path: 'payment-loader',
    loadChildren: () =>
      import('./payment-loader/payment-loader.module').then(
        (m) => m.PaymentLoaderPageModule,
      ),
  },
  {
    path: 'transaction-summary',
    loadChildren: () =>
      import('./transaction-summary/transaction-summary.module').then(
        (m) => m.TransactionSummaryPageModule,
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'splash',
    component: SplashComponent,
  },
  {
    path: '',
    redirectTo: '/splash',
    pathMatch: 'full',
  },
  {
    path: 'product-detail',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule,
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'payment-loader',
    loadChildren: () =>
      import('./payment-loader/payment-loader.module').then(
        (m) => m.PaymentLoaderPageModule,
      ),
  },
  {
    path: 'transaction-summary',
    loadChildren: () =>
      import('./transaction-summary/transaction-summary.module').then(
        (m) => m.TransactionSummaryPageModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentLoaderPage } from './payment-loader.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentLoaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentLoaderPageRoutingModule {}

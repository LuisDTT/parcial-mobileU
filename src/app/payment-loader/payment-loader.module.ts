import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentLoaderPageRoutingModule } from './payment-loader-routing.module';

import { PaymentLoaderPage } from './payment-loader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentLoaderPageRoutingModule
  ],
  declarations: [PaymentLoaderPage]
})
export class PaymentLoaderPageModule {}

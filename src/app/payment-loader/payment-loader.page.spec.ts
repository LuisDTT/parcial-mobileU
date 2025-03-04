import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentLoaderPage } from './payment-loader.page';

describe('PaymentLoaderPage', () => {
  let component: PaymentLoaderPage;
  let fixture: ComponentFixture<PaymentLoaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionSummaryPage } from './transaction-summary.page';

describe('TransactionSummaryPage', () => {
  let component: TransactionSummaryPage;
  let fixture: ComponentFixture<TransactionSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

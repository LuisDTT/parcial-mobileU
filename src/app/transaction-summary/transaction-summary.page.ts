import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface TransactionState {
  transactionData: any;
}

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.page.html',
  styleUrls: ['./transaction-summary.page.scss'],
  standalone: false,
})
export class TransactionSummaryPage implements OnInit {
  transactionData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.transactionData = navigation?.extras?.state
      ? (navigation.extras.state as TransactionState).transactionData
      : null;
  }

  ngOnInit() {
    if (!this.transactionData) {
      this.router.navigate(['/cart']);
    }
  }
}

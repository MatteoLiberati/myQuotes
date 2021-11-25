import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuotesService } from './quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private quotesService: QuotesService){}
  createQuote : boolean = false;
  subscriptionsCreateQuote : Subscription;

  ngOnInit(){
    this.subscriptionsCreateQuote = this.quotesService.clickCreateQuote.subscribe(event=>{
      this.createQuote = event;
    });
  }

  ngOnDestroy(){
    this.subscriptionsCreateQuote.unsubscribe();
  }
}

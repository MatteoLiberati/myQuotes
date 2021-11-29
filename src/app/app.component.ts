import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from './quote.interface';
import { QuotesService } from './quotes.service';
import { SuggestQuotesService } from './suggest-quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private quotesService: QuotesService){}
  createQuote : boolean = false;
  deleteModal : Quote;
  subCreateQuote : Subscription;
  subDeleteModal : Subscription;
  randomSuggestQuote : Quote;

  ngOnInit(){
    this.subCreateQuote = this.quotesService.clickCreateQuote.subscribe(event=>{
      this.createQuote = event;
    });

    this.subDeleteModal = this.quotesService.deleteModal.subscribe(deleteModal=>{
      this.deleteModal = deleteModal;
    })
  }

  ngOnDestroy(){
    this.subCreateQuote.unsubscribe();
    this.subDeleteModal.unsubscribe();
  }
}

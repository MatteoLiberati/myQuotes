import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from './quote.interface';
import { QuotesService } from './services/quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private quotesService: QuotesService){}
  subCreateQuote : Subscription;
  subDeleteModal : Subscription;
  subInfoMessage : Subscription;
  subErrorMessage : Subscription;

  deleteModal : Quote;
  randomSuggestQuote : Quote;
  createQuote : boolean = false;
  deleteAllQuotes : boolean = false;
  message : string = "" ;
  errorMessage : string = "" ;

  ngOnInit(){
    this.subCreateQuote = this.quotesService.clickCreateQuote.subscribe(event=>{
      this.createQuote = event;
    });

    this.subDeleteModal = this.quotesService.deleteModal.subscribe(deleteModal=>{
      this.deleteModal = deleteModal;
    })

    this.subInfoMessage = this.quotesService.infoMessage.subscribe(message=>{
      this.message = message;
      setTimeout(()=>{
        this.message = "";
      },2000)
    })

    this.quotesService.deleteAllQuotes.subscribe(deleteAllQuotes=>{
      this.deleteAllQuotes = deleteAllQuotes;
    });

    this.subErrorMessage = this.quotesService.errorMessage.subscribe(errorMessage=>{
      this.errorMessage = errorMessage;
    })

  }

  ngOnDestroy(){
    this.subCreateQuote.unsubscribe();
    this.subDeleteModal.unsubscribe();
    this.subInfoMessage.unsubscribe();
    this.subErrorMessage.unsubscribe();
  }
}

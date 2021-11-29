import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from './quote.interface';
import { QuotesService } from './quotes.service';

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
  subInfoMessage : Subscription;
  randomSuggestQuote : Quote;
  message : string = "" ;

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
  }

  ngOnDestroy(){
    this.subCreateQuote.unsubscribe();
    this.subDeleteModal.unsubscribe();
    this.subInfoMessage.unsubscribe();
  }
}

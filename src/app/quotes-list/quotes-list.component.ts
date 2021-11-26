import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quote } from '../quote.interface';
import { QuotesService } from '../quotes.service';


@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit, OnDestroy {

  constructor(private quotesService: QuotesService) { }

  spinner: boolean = false;
  quotes : Quote[] = [];
  noResult: boolean = false;
  searchMode : boolean = false;
  subUpdate : Subscription;
  subSearchMode : Subscription;
  subNoResult : Subscription;

  ngOnInit(): void {
    this.spinner = true;
    this.quotesService.initialLoadingQuotes();

    this.subUpdate = this.quotesService.updateQuotes.subscribe(quotes=>{
      this.quotes = quotes;
      this.spinner = false;
      if(this.quotes.length === 0){
        this.noResult = true;
      }
    })

    this.subSearchMode = this.quotesService.searchMode.subscribe(mode=>{
      this.searchMode = mode;
    })

    this.subNoResult = this.quotesService.noResult.subscribe(noResult=>{
      this.noResult = noResult;
    })
  }

  indexReverse(index : number){
    return ((this.quotes.length - 1)-index);
  }

  ngOnDestroy(): void {
    this.subSearchMode.unsubscribe();
    this.subUpdate.unsubscribe();
  }
}

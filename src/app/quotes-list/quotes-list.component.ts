import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote.interface';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  spinner: boolean = false;
  quotes : Quote[] = [];
  noResult: boolean = false;

  ngOnInit(): void {
    this.spinner = true;
    this.quotesService.initialLoadingQuotes();
    this.quotesService.updateQuotes.subscribe(quotes=>{
      this.quotes = quotes;
      this.spinner = false;
      if(this.quotes.length === 0){
        this.noResult = true;
      }
    })
  }

  indexReverse(index : number){
    return ((this.quotes.length - 1)-index);
  }
}

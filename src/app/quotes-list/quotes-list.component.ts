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

  ngOnInit(): void {
    this.quotesService.initialLoadingQuotes();
    this.quotesService.updateQuotes.subscribe(quotes=>{
      this.quotes = quotes;
      this.spinner = true;
    })
  }


}

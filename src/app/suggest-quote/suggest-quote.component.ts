
import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote.interface';
import { SuggestQuotesService } from '../suggest-quotes.service';

@Component({
  selector: 'app-suggest-quote',
  templateUrl: './suggest-quote.component.html',
  styleUrls: ['./suggest-quote.component.css']
})
export class SuggestQuoteComponent implements OnInit {
  suggestQuote : Quote;
  hidden : boolean = true;

  constructor(private suggestQuotesService : SuggestQuotesService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.suggestQuotesService.suggestQuote().subscribe(
        (randomSuggestQuote) =>  {
          this.suggestQuote = randomSuggestQuote;
          this.hidden = false;
        }
      );
    },4000)
  }

  closeSuggestQuote(){
    this.hidden = true;
  }

}

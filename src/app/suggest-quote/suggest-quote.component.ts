
import { Component, OnInit } from '@angular/core';
import { Quote } from '../quote.interface';
import { QuotesService } from '../services/quotes.service';
import { SuggestQuotesService } from '../services/suggest-quotes.service';

@Component({
  selector: 'app-suggest-quote',
  templateUrl: './suggest-quote.component.html',
  styleUrls: ['./suggest-quote.component.css']
})
export class SuggestQuoteComponent implements OnInit {
  suggestQuote : Quote;
  hidden : boolean = true;

  constructor(
    private suggestQuotesService : SuggestQuotesService,
    private quotesService : QuotesService
    ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.suggestQuotesService.suggestQuote().subscribe(
        (randomSuggestQuote) =>  {
          this.suggestQuote = randomSuggestQuote;
          this.sound();
          this.hidden = false;
        }, error => {
          this.quotesService.errorMessage.next("It is not possible to show the suggested quote");
          setTimeout(()=>{
            this.quotesService.errorMessage.next("");
          },4000)
        })
      },4500)
  }

  closeSuggestQuote(){
    this.hidden = true;
  }

  saveSuggestQuote(){
    this.suggestQuote.dateOfInput = new Date();
    this.suggestQuote.id = Date.now();
    this.quotesService.addNewQuote(this.suggestQuote);
    this.hidden = true;
  }

  private sound() {
    let audio = new Audio(
      'https://ringtone123.net/wp-content/uploads/2019/08/facebook_pop_up.mp3');
    audio.play();  
  }
}

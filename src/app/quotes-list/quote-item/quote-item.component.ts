import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/quote.interface';
import { QuotesService } from 'src/app/quotes.service';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.component.html',
  styleUrls: ['./quote-item.component.css']
})
export class QuoteItemComponent implements OnInit {

  @Input() quote : Quote;
  @Input() index : number;
  constructor(private quotesService : QuotesService) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.quotesService.deleteQuote(this.index);
  }

  onCopy(){
    const formatQuote = `${this.quote.quote}\n( ${this.quote.author} )`;
    navigator.clipboard.writeText(formatQuote);
  }
}

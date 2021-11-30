import { Component, Input } from '@angular/core';
import { Quote } from 'src/app/quote.interface';
import { QuotesService } from 'src/app/quotes.service';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.component.html',
  styleUrls: ['./quote-item.component.css']
})
export class QuoteItemComponent {

  @Input() quote : Quote;
  constructor(private quotesService : QuotesService) { }

  onDelete(){
    this.quotesService.deleteModal.next(this.quote);
  }

  onCopy(){
    const formatQuote = `${this.quote.quote}\n( ${this.quote.author} )`;
    navigator.clipboard.writeText(formatQuote);
    this.quotesService.infoMessage.next(
      this.quotesService.shortQuoteString(this.quote.quote) + "copied to clipboard"
      );
  }
}

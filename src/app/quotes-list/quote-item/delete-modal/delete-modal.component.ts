import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/quote.interface';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  constructor(private quotesService: QuotesService) { }
  @Input() quoteToDelete : Quote;

  onExit(){
    this.quoteUndefined();
  }

  onDelete(){
    this.quotesService.deleteQuote(this.quoteToDelete);
    this.quoteUndefined();
    this.quotesService.searchedString.next("");
  }

  private quoteUndefined(){
    this.quotesService.deleteModal.next(undefined);
  }

}

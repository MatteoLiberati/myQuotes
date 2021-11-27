import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/quote.interface';
import { QuotesService } from 'src/app/quotes.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }
  @Input() quoteToDelete : Quote;

  ngOnInit(): void {
  }

  onExit(){
    this.quoteUndefined();
  }

  onDelete(){
    this.quotesService.deleteQuote(this.quoteToDelete.id);
    this.quoteUndefined();
  }

  private quoteUndefined(){
    this.quotesService.deleteModal.next(undefined);
  }

}

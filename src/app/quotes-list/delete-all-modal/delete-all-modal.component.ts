import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/quotes.service';

@Component({
  selector: 'app-delete-all-modal',
  templateUrl: './delete-all-modal.component.html',
  styleUrls: ['./delete-all-modal.component.css']
})
export class DeleteAllModalComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
  }

  onExit(){
    this.quotesService.deleteAllQuotes.emit(false);
  }

  deleteAll(){
    this.quotesService.resetQuotes();
    this.onExit();
  }

}

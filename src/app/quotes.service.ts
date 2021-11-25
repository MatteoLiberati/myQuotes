import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbConnectionsService } from './db-connections.service';
import { Quote } from './quote.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private dbConnectionsService: DbConnectionsService) {}

  // quotes : Quote[] = [];
  updateQuotes : Subject<Quote[]> = new Subject();
  clickCreateQuote : EventEmitter<boolean> = new EventEmitter();

  quotes : Quote[] = [
    {
      "quote" : "Una vera amica è colei che ti prende per mano e ti tocca il cuore." ,
      "author" : "Gabriel Garcia Márquez",
      "dateOfInput" : new Date(),
    },
    {
      "quote" : "Gioca e basta. Divertiti. Goditi la partita." ,
      "author" : "Michael Jordan",
      "dateOfInput" : new Date(),
    },
    {
      "quote" : "Un’amica è un’altra me stessa." ,
      "author" : "Zenone di Cizio",
      "dateOfInput" : new Date(),
    }
  ];

  addNewQuote(quote: Quote) {
    this.quotes.push(quote);
    this.dbConnectionsService.saveRecords(this.quotes).subscribe();
    this.updateSubjectQuotes();
  }

  initialLoadingQuotes(){
    this.dbConnectionsService.fetchRecords().subscribe((quotes) => {
      if(quotes != null){
        this.quotes = quotes;
      }
      this.updateSubjectQuotes();
    })
  }

  updateSubjectQuotes(){
    this.updateQuotes.next(this.quotes.slice());
  }

}

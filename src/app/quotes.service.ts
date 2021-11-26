import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbConnectionsService } from './db-connections.service';
import { Quote } from './quote.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private dbConnectionsService: DbConnectionsService) {}

  quotes : Quote[] = [];
  updateQuotes : Subject<Quote[]> = new Subject();
  clickCreateQuote : EventEmitter<boolean> = new EventEmitter();
  searchMode : EventEmitter<boolean> = new EventEmitter();
  noResult : EventEmitter<boolean> = new EventEmitter();

  // quotes : Quote[] = [
  //   {
  //     "quote" : "Una vera amica è colei che ti prende per mano e ti tocca il cuore." ,
  //     "author" : "Gabriel Garcia Márquez",
  //     "dateOfInput" : new Date('2015-07-15T05:24:00'),
  //   },
  //   {
  //     "quote" : "Gioca e basta. Divertiti. Goditi la partita." ,
  //     "author" : "Michael Jordan",
  //     "dateOfInput" : new Date('2017-09-15T05:24:00'),
  //   },
  //   {
  //     "quote" : "Un’amica è un’altra me stessa." ,
  //     "author" : "Zenone di Cizio",
  //     "dateOfInput" : new Date('2017-10-05T05:24:00'),
  //   },
  //   {
  //     "quote" : "L'arte comincia dalla resistenza: dalla resistenza vinta. Non esiste capolavoro umano che non sia stato ottenuto." ,
  //     "author" : "anonymous",
  //     "dateOfInput" : new Date('2017-10-08T05:24:00'),
  //   },
  //   {
  //     "quote" : "L'educazione consiste nel darci delle idee, la buona educazione nel metterle in proporzione." ,
  //     "author" : "MONTESQUIEU",
  //     "dateOfInput" : new Date('2020-11-10T05:24:00'),
  //   },
  //   {
  //     "quote" : "Molti confondono una cattiva gestione con il destino" ,
  //     "author" : "kin hubbard",
  //     "dateOfInput" : new Date('2020-12-10T05:24:00'),
  //   },
  //   {
  //     "quote" : "Non cercare giustificazioni per il fallimento, cercale per la vittoria." ,
  //     "author" : "chi-chi rodriguez",
  //     "dateOfInput" : new Date('2021-01-10T05:24:00'),
  //   }
  // ];

  addNewQuote(quote: Quote) {
    this.quotes.push(quote);
    this.saveRecords();
    this.updateSubjectQuotes();
    if(this.quotes.length != 0){
      this.noResult.emit(false);
    }
  }

  deleteQuote(id:number){
    this.quotes.splice(id,1);
    this.saveRecords();
    this.updateSubjectQuotes();
    if(this.quotes.length == 0){
      this.noResult.emit(true);
    }
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

  saveRecords(){
    this.dbConnectionsService.saveRecords(this.quotes).subscribe();
  }

  searchQuotes(userSearch : string){
    if(userSearch != ""){
      this.noResult.emit(false);
      this.searchMode.emit(true);
      let strings : string[] = userSearch.toLowerCase().split(" "); 
      // double insertion control
      strings = [...new Set(strings)];
  
      let filteredQuotes : Quote[] = [];
      for (let string of strings){
        this.quotes.map(quote=>{
          //exclude punctuation
          let punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;
        
          if(quote.author.toLowerCase().replace(punctRE, ' ').split(" ").includes(string.replace(punctRE, ' ')) 
          || quote.quote.toLowerCase().replace(punctRE, ' ').split(" ").includes(string.replace(punctRE, ' '))){
            if(!filteredQuotes.includes(quote)){
              filteredQuotes.push(quote);
            }
          }
        })
      }
      this.updateQuotes.next(filteredQuotes.slice());
    }else{
      this.searchMode.emit(false);
      this.updateSubjectQuotes();
      if(this.quotes.length != 0){
        this.noResult.emit(false);
      }
    }
  }

}

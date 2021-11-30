import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DbConnectionsService } from './db-connections.service';
import { Quote } from './quote.interface';
// Initial setup quotes - associate with the variable quotes
import { initializeQuotes } from "../assets/initializeQuotes";

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor(private dbConnectionsService: DbConnectionsService) {}

  quotes : Quote[] = [];
  updateQuotes : Subject<Quote[]> = new Subject();
  deleteModal : Subject<Quote> = new Subject();
  searchedString : Subject<string> = new Subject();
  infoMessage : Subject<string> = new Subject();
  clickCreateQuote : EventEmitter<boolean> = new EventEmitter();
  deleteAllQuotes : EventEmitter<boolean> = new EventEmitter();
  searchMode : EventEmitter<boolean> = new EventEmitter();
  noResult : EventEmitter<boolean> = new EventEmitter();
  menuMobile : EventEmitter<boolean> = new EventEmitter();

  addNewQuote(quote: Quote) {
    this.quotes.push(quote);
    this.saveRecords();
    this.updateSubjectQuotes();
    if(this.quotes.length != 0){
      this.noResult.emit(false);
    }
    this.infoMessage.next(this.shortQuoteString(quote.quote) + "saved successfully");
  }

  deleteQuote(quoteToDelete : Quote){
    this.quotes.forEach(quote=>{
      if(quote.id === quoteToDelete.id){
        this.quotes.splice(this.quotes.indexOf(quote),1);
      }
    })
    this.saveRecords();
    this.updateSubjectQuotes();
    if(this.quotes.length == 0){
      this.noResult.emit(true);
    }
    this.menuMobile.emit(true);
    this.infoMessage.next(this.shortQuoteString(quoteToDelete.quote) + "deleted successfully");
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
    this.menuMobile.emit(true);
  }

  resetQuotes(){
    this.quotes = [];
    this.saveRecords();
    this.updateSubjectQuotes();
    this.infoMessage.next("All citations have been deleted");
    this.menuMobile.emit(true);
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
          if(quote.author.toLowerCase().includes(string) 
          || quote.quote.toLowerCase().includes(string)){
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

  alternativeSearchQuotes(userSearch : string){
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

  shortQuoteString(quote : string){
    let shortQuote = `"${quote}" `;
    if(quote.length > 38){
      shortQuote = `"${quote.substr(0,38)} ..." `
    }
    return shortQuote;
  }

}

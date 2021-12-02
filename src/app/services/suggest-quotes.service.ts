import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuggestQuotesService {

  constructor(private http: HttpClient) { }

  suggestQuote(){
    return this.http.get<[]>("https://type.fit/api/quotes").pipe(
      map(
        (results) => {
          let randomNumber = Math.ceil((Math.random() * 1643));
          return {
            "quote": results[randomNumber]['text'],
            "author": results[randomNumber]['author']===null ? "Anonymous" : results[randomNumber]['author'],
            "dateOfInput" : new Date(),
            "id" : Date.now(),
          };
        }
    ))
  }
}

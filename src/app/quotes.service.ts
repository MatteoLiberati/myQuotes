import { Injectable } from '@angular/core';
import { Quote } from './quote.interface';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  constructor() {}

  addNewQuote(quote: Quote) {
    console.log(quote);
  }
}

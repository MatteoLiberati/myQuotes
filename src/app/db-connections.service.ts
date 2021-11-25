import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote } from './quote.interface';

@Injectable({
  providedIn: 'root'
})
export class DbConnectionsService {

  constructor(private http: HttpClient) { }
  
  url: string =
  'https://ng-challenge-sparkfabrik-default-rtdb.firebaseio.com/quotes.json';

  saveRecords(quotes : Quote[]){
    return this.http.put(this.url, quotes);
  }

  fetchRecords(){
    return this.http.get<Quote[]>(this.url);
  }
}

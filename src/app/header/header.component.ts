import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private quotesService: QuotesService) { }

  ngOnInit(): void {
  }

  onAddQuote(){
    this.quotesService.clickCreateQuote.emit(true);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private quotesService: QuotesService) { }
  subSearchedString : Subscription;
  subMenuMobile : Subscription;
  userSearch : string ="";
  collapse : boolean = true;

  ngOnInit(): void {
    this.subSearchedString = this.quotesService.searchedString.subscribe(searchedString=>{
      this.userSearch = searchedString;
    })

    this.subMenuMobile = this.quotesService.menuMobile.subscribe(menuMobile=>{
      this.collapse = menuMobile;
    })
  }

  onAddQuote(){
    this.quotesService.clickCreateQuote.emit(true);
  }

  onSearch(){
    this.quotesService.searchMode.emit(true);
    this.quotesService.searchQuotes(this.userSearch.trim());
  }

  ngOnDestroy(){
    this.subSearchedString.unsubscribe();
    this.subMenuMobile.unsubscribe();
  }

  toogleMenu(){
    this.collapse = !this.collapse;
  }

}

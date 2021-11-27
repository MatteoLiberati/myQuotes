import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuoteItemComponent } from './quotes-list/quote-item/quote-item.component';
import { HeaderComponent } from './header/header.component';
import { DeleteModalComponent } from './quotes-list/quote-item/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NewQuoteComponent,
    QuotesListComponent,
    QuoteItemComponent,
    HeaderComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

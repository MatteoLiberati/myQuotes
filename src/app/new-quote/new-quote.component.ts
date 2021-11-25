import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Quote } from '../quote.interface';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css'],
})
export class NewQuoteComponent implements OnInit {
  constructor(private quotesService: QuotesService) {}

  newQuoteForm!: FormGroup;
  newQuote: Quote | undefined;
  todayDate: Date | undefined;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.newQuoteForm = new FormGroup({
      quote: new FormControl(null, Validators.required),
      author: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.newQuoteForm.valid) {
      this.newQuote = {
        quote: this.newQuoteForm.get('quote')!.value,
        author: this.newQuoteForm.get('author')
          ? this.newQuoteForm.get('author')!.value
          : 'anonymous',
        dateOfInput: new Date(),
      };
      this.quotesService.addNewQuote(this.newQuote);
    } else {
      alert('something went wrong!');
    }
  }
}

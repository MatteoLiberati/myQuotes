import { Component, Input, OnInit } from '@angular/core';
import { Quote } from 'src/app/quote.interface';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.component.html',
  styleUrls: ['./quote-item.component.css']
})
export class QuoteItemComponent implements OnInit {

  @Input() quote : Quote;
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    
  }
}

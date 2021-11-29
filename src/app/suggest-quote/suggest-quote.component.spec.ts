import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestQuoteComponent } from './suggest-quote.component';

describe('SuggestQuoteComponent', () => {
  let component: SuggestQuoteComponent;
  let fixture: ComponentFixture<SuggestQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllModalComponent } from './delete-all-modal.component';

describe('DeleteAllModalComponent', () => {
  let component: DeleteAllModalComponent;
  let fixture: ComponentFixture<DeleteAllModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAllModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAllModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

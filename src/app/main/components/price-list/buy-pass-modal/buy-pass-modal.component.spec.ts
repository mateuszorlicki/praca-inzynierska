import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPassModalComponent } from './buy-pass-modal.component';

describe('BuyPassModalComponent', () => {
  let component: BuyPassModalComponent;
  let fixture: ComponentFixture<BuyPassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

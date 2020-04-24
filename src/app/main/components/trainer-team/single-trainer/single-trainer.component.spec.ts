import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainerComponent } from './single-trainer.component';

describe('SingleTrainerComponent', () => {
  let component: SingleTrainerComponent;
  let fixture: ComponentFixture<SingleTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

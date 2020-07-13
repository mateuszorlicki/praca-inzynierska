import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainingCardComponent } from './personal-training-card.component';

describe('PersonalTrainingCardComponent', () => {
  let component: PersonalTrainingCardComponent;
  let fixture: ComponentFixture<PersonalTrainingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalTrainingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTrainingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

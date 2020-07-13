import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrainingAddCardComponent } from './personal-training-add-card.component';

describe('PersonalTrainingAddCardComponent', () => {
  let component: PersonalTrainingAddCardComponent;
  let fixture: ComponentFixture<PersonalTrainingAddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalTrainingAddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTrainingAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

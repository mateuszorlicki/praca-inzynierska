import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTrainingsComponent } from './group-trainings.component';

describe('GroupTrainingsComponent', () => {
  let component: GroupTrainingsComponent;
  let fixture: ComponentFixture<GroupTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

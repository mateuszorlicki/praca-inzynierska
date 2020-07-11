import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTrainingsTimetableComponent } from './group-trainings-timetable.component';

describe('GroupTrainingsTimetableComponent', () => {
  let component: GroupTrainingsTimetableComponent;
  let fixture: ComponentFixture<GroupTrainingsTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTrainingsTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTrainingsTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRoomComponent } from './training-room.component';

describe('TrainingRoomComponent', () => {
  let component: TrainingRoomComponent;
  let fixture: ComponentFixture<TrainingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

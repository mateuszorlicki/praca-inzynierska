import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerTeamComponent } from './trainer-team.component';

describe('TrainerTeamComponent', () => {
  let component: TrainerTeamComponent;
  let fixture: ComponentFixture<TrainerTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

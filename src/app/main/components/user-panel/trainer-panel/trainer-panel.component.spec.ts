import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPanelComponent } from './trainer-panel.component';

describe('TrainerPanelComponent', () => {
  let component: TrainerPanelComponent;
  let fixture: ComponentFixture<TrainerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

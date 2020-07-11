import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPassModalComponent } from './add-edit-pass-modal.component';

describe('AddEditPassModalComponent', () => {
  let component: AddEditPassModalComponent;
  let fixture: ComponentFixture<AddEditPassModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPassModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A3TrainingEventListComponent } from './a3-training-event-list.component';

describe('A3TrainingEventListComponent', () => {
  let component: A3TrainingEventListComponent;
  let fixture: ComponentFixture<A3TrainingEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A3TrainingEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A3TrainingEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSenseiModalComponent } from './your-sensei-modal.component';

describe('YourSenseiModalComponent', () => {
  let component: YourSenseiModalComponent;
  let fixture: ComponentFixture<YourSenseiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourSenseiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourSenseiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

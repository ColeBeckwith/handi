import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedbackRequestComponent } from './new-feedback-request.component';

describe('NewFeedbackRequestComponent', () => {
  let component: NewFeedbackRequestComponent;
  let fixture: ComponentFixture<NewFeedbackRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeedbackRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedbackRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

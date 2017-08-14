import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSubmissionComponent } from './feedback-submission.component';

describe('FeedbackSubmissionComponent', () => {
  let component: FeedbackSubmissionComponent;
  let fixture: ComponentFixture<FeedbackSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

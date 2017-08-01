import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptSubmissionComponent } from './script-submission.component';

describe('ScriptSubmissionComponent', () => {
  let component: ScriptSubmissionComponent;
  let fixture: ComponentFixture<ScriptSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

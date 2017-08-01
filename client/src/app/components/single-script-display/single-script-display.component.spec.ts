import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleScriptDisplayComponent } from './single-script-display.component';

describe('SingleScriptDisplayComponent', () => {
  let component: SingleScriptDisplayComponent;
  let fixture: ComponentFixture<SingleScriptDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleScriptDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleScriptDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

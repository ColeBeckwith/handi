import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedScriptsDisplayComponent } from './suggested-scripts-display.component';

describe('SuggestedScriptsDisplayComponent', () => {
  let component: SuggestedScriptsDisplayComponent;
  let fixture: ComponentFixture<SuggestedScriptsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedScriptsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedScriptsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

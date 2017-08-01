import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptsDisplayComponent } from './scripts-display.component';

describe('ScriptsDisplayComponent', () => {
  let component: ScriptsDisplayComponent;
  let fixture: ComponentFixture<ScriptsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

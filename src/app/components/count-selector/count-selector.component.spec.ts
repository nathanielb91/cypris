import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountSelectorComponent } from './count-selector.component';

describe('CountSelectorComponent', () => {
  let component: CountSelectorComponent;
  let fixture: ComponentFixture<CountSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountSelectorComponent]
    });
    fixture = TestBed.createComponent(CountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

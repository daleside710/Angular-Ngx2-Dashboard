import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdimagebtnComponent } from './gwdimagebtn.component';

describe('GwdimagebtnComponent', () => {
  let component: GwdimagebtnComponent;
  let fixture: ComponentFixture<GwdimagebtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdimagebtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdimagebtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwoverviewComponent } from './fwoverview.component';

describe('FwoverviewComponent', () => {
  let component: FwoverviewComponent;
  let fixture: ComponentFixture<FwoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

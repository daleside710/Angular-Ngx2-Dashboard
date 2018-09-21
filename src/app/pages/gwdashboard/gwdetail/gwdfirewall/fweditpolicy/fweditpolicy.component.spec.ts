import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FweditpolicyComponent } from './fweditpolicy.component';

describe('FweditpolicyComponent', () => {
  let component: FweditpolicyComponent;
  let fixture: ComponentFixture<FweditpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FweditpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FweditpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

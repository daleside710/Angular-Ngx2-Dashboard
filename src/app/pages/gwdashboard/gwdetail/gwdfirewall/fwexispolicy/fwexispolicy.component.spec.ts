import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwexispolicyComponent } from './fwexispolicy.component';

describe('FwexispolicyComponent', () => {
  let component: FwexispolicyComponent;
  let fixture: ComponentFixture<FwexispolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwexispolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwexispolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

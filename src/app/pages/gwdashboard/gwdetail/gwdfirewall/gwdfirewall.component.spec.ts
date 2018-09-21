import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdfirewallComponent } from './gwdfirewall.component';

describe('GwdfirewallComponent', () => {
  let component: GwdfirewallComponent;
  let fixture: ComponentFixture<GwdfirewallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdfirewallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdfirewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

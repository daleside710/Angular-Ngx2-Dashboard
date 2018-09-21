import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysexistingComponent } from './sysexisting.component';

describe('SysexistingComponent', () => {
  let component: SysexistingComponent;
  let fixture: ComponentFixture<SysexistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysexistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysexistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

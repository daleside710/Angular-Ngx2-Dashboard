import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysoverviewComponent } from './sysoverview.component';

describe('SysoverviewComponent', () => {
  let component: SysoverviewComponent;
  let fixture: ComponentFixture<SysoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

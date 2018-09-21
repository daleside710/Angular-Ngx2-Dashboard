import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdoverviewComponent } from './gwdoverview.component';

describe('GwdoverviewComponent', () => {
  let component: GwdoverviewComponent;
  let fixture: ComponentFixture<GwdoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

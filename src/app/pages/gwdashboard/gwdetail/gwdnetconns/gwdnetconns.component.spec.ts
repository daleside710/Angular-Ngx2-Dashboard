import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdnetconnsComponent } from './gwdnetconns.component';

describe('GwdnetconnsComponent', () => {
  let component: GwdnetconnsComponent;
  let fixture: ComponentFixture<GwdnetconnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdnetconnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdnetconnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

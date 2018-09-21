import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwmainComponent } from './gwmain.component';

describe('GwmainComponent', () => {
  let component: GwmainComponent;
  let fixture: ComponentFixture<GwmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

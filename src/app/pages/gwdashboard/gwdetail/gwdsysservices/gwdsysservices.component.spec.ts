import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdsysservicesComponent } from './gwdsysservices.component';

describe('GwdsysservicesComponent', () => {
  let component: GwdsysservicesComponent;
  let fixture: ComponentFixture<GwdsysservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdsysservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdsysservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

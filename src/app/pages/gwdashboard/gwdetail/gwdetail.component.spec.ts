import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwdetailComponent } from './gwdetail.component';

describe('GwdetailComponent', () => {
  let component: GwdetailComponent;
  let fixture: ComponentFixture<GwdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

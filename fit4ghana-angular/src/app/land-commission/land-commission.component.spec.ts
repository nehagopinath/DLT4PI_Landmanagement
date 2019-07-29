import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCommissionComponent } from './land-commission.component';

describe('LandCommissionComponent', () => {
  let component: LandCommissionComponent;
  let fixture: ComponentFixture<LandCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

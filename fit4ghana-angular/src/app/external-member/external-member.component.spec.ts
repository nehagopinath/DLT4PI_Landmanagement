import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalMemberComponent } from './external-member.component';

describe('ExternalMemberComponent', () => {
  let component: ExternalMemberComponent;
  let fixture: ComponentFixture<ExternalMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

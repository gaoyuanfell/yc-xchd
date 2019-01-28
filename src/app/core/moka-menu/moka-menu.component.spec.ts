import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokaMenuComponent } from './moka-menu.component';

describe('MokaMenuComponent', () => {
  let component: MokaMenuComponent;
  let fixture: ComponentFixture<MokaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

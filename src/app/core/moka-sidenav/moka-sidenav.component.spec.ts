import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokaSidenavComponent } from './moka-sidenav.component';

describe('MokaSidenavComponent', () => {
  let component: MokaSidenavComponent;
  let fixture: ComponentFixture<MokaSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokaSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokaSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

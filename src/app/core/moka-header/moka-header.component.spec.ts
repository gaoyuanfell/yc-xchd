import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokaHeaderComponent } from './moka-header.component';

describe('MokaHeaderComponent', () => {
  let component: MokaHeaderComponent;
  let fixture: ComponentFixture<MokaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

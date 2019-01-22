import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokaContentComponent } from './moka-content.component';

describe('MokaContentComponent', () => {
  let component: MokaContentComponent;
  let fixture: ComponentFixture<MokaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MokaLayerComponent } from './moka-layer.component';

describe('MokaLayerComponent', () => {
  let component: MokaLayerComponent;
  let fixture: ComponentFixture<MokaLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MokaLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MokaLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

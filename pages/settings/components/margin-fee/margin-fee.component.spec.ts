import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginFeeComponent } from './margin-fee.component';

describe('MarginFeeComponent', () => {
  let component: MarginFeeComponent;
  let fixture: ComponentFixture<MarginFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarginFeeComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarginFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

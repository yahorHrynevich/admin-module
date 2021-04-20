import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveFeeComponent } from './add-remove-fee.component';

describe('AddFeeComponent', () => {
  let component: AddRemoveFeeComponent;
  let fixture: ComponentFixture<AddRemoveFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddRemoveFeeComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

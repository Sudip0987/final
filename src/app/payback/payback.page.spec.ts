import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybackPage } from './payback.page';

describe('PaybackPage', () => {
  let component: PaybackPage;
  let fixture: ComponentFixture<PaybackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaybackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaybackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingPage } from './spending.page';

describe('SpendingPage', () => {
  let component: SpendingPage;
  let fixture: ComponentFixture<SpendingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

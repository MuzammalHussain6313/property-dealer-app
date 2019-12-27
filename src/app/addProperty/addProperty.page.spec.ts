import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyPage } from './addProperty.page';

describe('AddPropertyPage', () => {
  let component: AddPropertyPage;
  let fixture: ComponentFixture<AddPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

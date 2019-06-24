import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagPage } from './pag.page';

describe('PagPage', () => {
  let component: PagPage;
  let fixture: ComponentFixture<PagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmailPage } from './loginmail.page';

describe('LoginmailPage', () => {
  let component: LoginmailPage;
  let fixture: ComponentFixture<LoginmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalZadanie8Component } from './modal-zadanie8.component';

describe('ModalZadanie8Component', () => {
  let component: ModalZadanie8Component;
  let fixture: ComponentFixture<ModalZadanie8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalZadanie8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalZadanie8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

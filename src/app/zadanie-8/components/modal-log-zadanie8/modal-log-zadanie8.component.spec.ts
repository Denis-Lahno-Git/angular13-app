import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLogZadanie8Component } from './modal-log-zadanie8.component';

describe('ModalLogZadanie8Component', () => {
  let component: ModalLogZadanie8Component;
  let fixture: ComponentFixture<ModalLogZadanie8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLogZadanie8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLogZadanie8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

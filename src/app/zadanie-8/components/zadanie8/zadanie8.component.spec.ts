import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zadanie8Component } from './zadanie8.component';

describe('Zadanie8Component', () => {
  let component: Zadanie8Component;
  let fixture: ComponentFixture<Zadanie8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zadanie8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zadanie8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

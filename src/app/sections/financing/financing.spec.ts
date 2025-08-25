import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financing } from './financing';

describe('Financing', () => {
  let component: Financing;
  let fixture: ComponentFixture<Financing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Financing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Financing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastshaComponent } from './fastsha.component';

describe('FastshahComponent', () => {
  let component: FastshaComponent;
  let fixture: ComponentFixture<FastshaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastshaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastshaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

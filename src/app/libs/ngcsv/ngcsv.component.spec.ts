import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcsvComponent } from './ngcsv.component';

describe('NgcsvComponent', () => {
  let component: NgcsvComponent;
  let fixture: ComponentFixture<NgcsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgcsvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

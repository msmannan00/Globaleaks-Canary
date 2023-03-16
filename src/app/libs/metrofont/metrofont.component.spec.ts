import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrofontComponent } from './metrofont.component';

describe('MetrofontComponent', () => {
  let component: MetrofontComponent;
  let fixture: ComponentFixture<MetrofontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetrofontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetrofontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationComponent } from './internationalization.component';

describe('TempComponent', () => {
  let component: InternationalizationComponent;
  let fixture: ComponentFixture<InternationalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

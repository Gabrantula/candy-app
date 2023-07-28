import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabyPageComponent } from './gaby-page.component';

describe('GabyPageComponent', () => {
  let component: GabyPageComponent;
  let fixture: ComponentFixture<GabyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GabyPageComponent]
    });
    fixture = TestBed.createComponent(GabyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

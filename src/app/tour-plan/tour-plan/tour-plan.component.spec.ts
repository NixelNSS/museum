import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPlanComponent } from './tour-plan.component';

describe('ShoppingCartComponent', () => {
  let component: TourPlanComponent;
  let fixture: ComponentFixture<TourPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TourPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

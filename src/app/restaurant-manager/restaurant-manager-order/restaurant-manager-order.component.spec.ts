import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManagerOrderComponent } from './restaurant-manager-order.component';

describe('RestaurantManagerOrderComponent', () => {
  let component: RestaurantManagerOrderComponent;
  let fixture: ComponentFixture<RestaurantManagerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManagerOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantManagerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

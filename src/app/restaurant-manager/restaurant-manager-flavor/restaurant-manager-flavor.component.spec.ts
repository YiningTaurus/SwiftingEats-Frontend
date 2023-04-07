import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManagerFlavorComponent } from './restaurant-manager-flavor.component';

describe('RestaurantManagerFlavorComponent', () => {
  let component: RestaurantManagerFlavorComponent;
  let fixture: ComponentFixture<RestaurantManagerFlavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManagerFlavorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantManagerFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

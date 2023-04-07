import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManagerMenuComponent } from './restaurant-manager-menu.component';

describe('RestaurantManagerMenuComponent', () => {
  let component: RestaurantManagerMenuComponent;
  let fixture: ComponentFixture<RestaurantManagerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManagerMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

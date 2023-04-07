import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantManagerMenuDetailComponent } from './restaurant-manager-menu-detail.component';

describe('RestaurantManagerMenuDetailComponent', () => {
  let component: RestaurantManagerMenuDetailComponent;
  let fixture: ComponentFixture<RestaurantManagerMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantManagerMenuDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantManagerMenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

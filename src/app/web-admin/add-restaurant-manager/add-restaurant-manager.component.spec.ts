import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantManagerComponent } from './add-restaurant-manager.component';

describe('AddRestaurantManagerComponent', () => {
  let component: AddRestaurantManagerComponent;
  let fixture: ComponentFixture<AddRestaurantManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRestaurantManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

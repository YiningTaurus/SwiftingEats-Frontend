import {Component, OnInit} from "@angular/core";
import {Restaurant} from "../shared/model/restaurant.model";
import {RestaurantService} from "../shared/service/restaurant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})

export class RestaurantComponent implements OnInit{

  restaurants: Restaurant[] | undefined;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  onRestaurantClick(restaurantId: number) {
    this.router.navigate(['/restaurant', restaurantId, 'menu'])
      .then(restaurantId => {
        if (restaurantId) {
          console.log('Navigation successful');
        } else {
          console.log('Navigation failed');
        }
      });
  }
}

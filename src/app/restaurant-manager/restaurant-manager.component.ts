import {Component, OnInit} from '@angular/core';
import {Restaurant} from "../shared/model/restaurant.model";
import {AuthService} from "../shared/service/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-restaurant-manager',
  templateUrl: './restaurant-manager.component.html',
  styleUrls: ['./restaurant-manager.component.scss']
})

export class RestaurantManagerComponent implements OnInit {
  activeTab = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void { }

  onTabChanged(event: MatTabChangeEvent): void {
    this.activeTab = event.index;
    switch (event.index) {
      case 0:
        this.router.navigate(['restaurant-manager-flavor'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['restaurant-manager-menu'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['restaurant-manager-order'], {relativeTo: this.route});
        break;
      default:
        break;
    }
  }
}

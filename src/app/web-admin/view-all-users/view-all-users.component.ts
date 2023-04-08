import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {RestaurantService} from "../../shared/service/restaurant.service";
import {UserService} from "../../shared/service/user.service";
import {User} from "../../shared/model/user.model";

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.scss']
})
export class ViewAllUsersComponent  implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}


  users: User[] = [];
  displayedColumns: string[] = [
    'username',
    'role',
    'restaurantName',
    'restaurantImage',
    'restaurantCategory',
  ];


  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }


}

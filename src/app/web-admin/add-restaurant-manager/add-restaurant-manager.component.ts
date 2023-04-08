import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../shared/enum/role.enum";
import {UserService} from "../../shared/service/user.service";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-add-restaurant-manager',
  templateUrl: './add-restaurant-manager.component.html',
  styleUrls: ['./add-restaurant-manager.component.scss']
})
export class AddRestaurantManagerComponent {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.newRestaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      restaurantCategory: ['', Validators.required],
    });

    this.newManagerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  newRestaurantForm: FormGroup;
  newManagerForm: FormGroup;
  isLinear = true;


  onSubmit(stepper: MatStepper): void {
    if (this.newRestaurantForm.invalid || this.newManagerForm.invalid) {
      return;
    }
    const restaurantData = this.newRestaurantForm.value;
    const managerData = this.newManagerForm.value;
    const {name, image, restaurantCategory} = restaurantData;
    const {username, password} = managerData;
    this.userService
      .createRestaurantAndManager(
        {
          id: -1,
          name: name,
          image: image,
          restaurantCategory: restaurantCategory,
        },
        {
          id: -1,
          username: username,
          password: password,
          role: Role.RESTAURANT_MANAGER,
        }
      )
      .subscribe(
        (response) => {
          console.log('Created restaurant and manager:', response);
          stepper.next();
        },
        (error) => {
          console.error('Error creating restaurant and manager:', error);
          alert('An error occurred while creating the restaurant and manager. Please try again.');
        }
      );
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/service/user.service";
import {Router} from "@angular/router";
import {User} from "../shared/model/user.model";
import {Role} from "../shared/enum/role.enum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedRole = (navigation && navigation.extras.state && navigation.extras.state['role']) ? navigation.extras.state['role'] : Role.CUSTOMER;
    this.setRegisterButtonText();
  }

  registerFormInstance!: FormGroup;
  usernameCollision: boolean = false;
  selectedRole: Role = Role.CUSTOMER;
  public registerButtonText: string = '';

  ngOnInit() {
    this.registerFormInstance = this.fb.group({
      username: ['', [Validators.email, Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ''
      }, {validators: [RegisterComponent.passwordValidator]})
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.selectedRole = navigation.extras.state['role'];
    }
  }


  private setRegisterButtonText(): void {
    switch (this.selectedRole) {
      case Role.CUSTOMER:
        this.registerButtonText = 'Register as our customer!';
        break;
      case Role.RESTAURANT_MANAGER:
        this.registerButtonText = 'Register as a restaurant manager!';
        break;
      case Role.WEB_ADMIN:
        this.registerButtonText = 'Register as our web admin!';
        break;
      default:
        this.registerButtonText = 'Register as our customer!';
        break;
    }
  }


  static passwordValidator({value: {password, confirmPassword}}: FormGroup): null | {passwordsNotMatch: string}{
    return password === confirmPassword ? null : {passwordsNotMatch: 'Password and confirmPassword are not the same'};
  }

  register(role: Role) {
    if (this.registerFormInstance.valid) {
      const user: User = {
        username: this.registerFormInstance.get('username')?.value,
        password: this.registerFormInstance.get('passwordGroup.password')?.value,
        role: role
      };

      this.userService.addUser(user).subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            this.usernameCollision = true;
            this.registerFormInstance.get('username')?.setErrors({ 'collision': true });
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }


}


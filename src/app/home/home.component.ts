import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Role} from "../shared/enum/role.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private router: Router) {}

  public Role = Role;

  navigateToRegister(role: Role): void {
    this.router.navigate(['/register'], { state: { role: role } });
  }
}

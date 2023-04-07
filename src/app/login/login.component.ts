import {Component} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit(loginForm: NgForm): void{
    console.log(loginForm);
    const user = loginForm.value;
    this.auth.login(user)
      .subscribe(res => {
        console.log(res);
        if(res.success){
          this.auth.user = res.user;
          this.router.navigate(['/home']).catch();
        }
      });
  }
}

import {Component, OnInit} from '@angular/core';
import {UserDetail} from "../shared/model/userDetail.model";
import {UserDetailService} from "../shared/service/userDetail.service";
import {AuthService} from "../shared/service/auth.service";
import {User} from "../shared/model/user.model";
import {Role} from "../shared/enum/role.enum";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  userDetail: UserDetail = {
    user: { id: -1, username: '', password: '', role: Role.RESTAURANT_MANAGER },
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  };

  user: User = { id: -1, username: '', password: '', role: Role.RESTAURANT_MANAGER };

  userDetailExists = false;

  constructor(
    private userDetailService: UserDetailService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.loginStatus.subscribe((user) => {
      if (user && user.id) {
        this.user = user;
        console.log('Account ngOnInit ' + user.id + user.role);
        const userId = user.id;
        this.userDetailService
          .getUserDetail(userId)
          .subscribe((userDetail) => {
            if (userDetail) {
              this.userDetail = userDetail;
              this.userDetailExists = true;
            } else {
              this.userDetail.user = user;
            }
          });
      }
    });
  }

  saveUserDetail(userDetail: UserDetail): void {
    if (this.userDetailExists) {
      console.log(userDetail);
      this.userDetailService
        .updateUserDetail(userDetail)
        .subscribe((response) => {
          console.log('User detail updated:', response);
        });
    } else {
      this.userDetailService
        .addUserDetail(userDetail)
        .subscribe((response) => {
          console.log('User detail added:', response);
          this.userDetailExists = true;
        });
    }
  }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDetail} from "../model/userDetail.model";
import {environment} from "../../../environments/environment.development";

@Injectable()
export class UserDetailService{

  constructor(private httpClient: HttpClient) {}

  getUserDetail(userId: number): Observable<UserDetail> {
    console.log(userId);
    return this.httpClient.get<UserDetail>(`${environment.api_url}/userDetail/user/${userId}`);
  }

  addUserDetail(userDetail: UserDetail): Observable<any> {
    return this.httpClient.post<any>(`${environment.api_url}/userDetail`, userDetail, {
      withCredentials: true
    });
  }

  updateUserDetail(userDetail: UserDetail): Observable<any> {
    return this.httpClient.put<any>(`${environment.api_url}/userDetail`, userDetail);
  }

}

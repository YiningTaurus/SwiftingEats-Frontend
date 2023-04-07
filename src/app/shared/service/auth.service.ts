import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {User} from "../model/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {
    this.checkLogin().subscribe((res) => {
      if (res.success) {
        this.user = res.user;
        this.loginStatus.next(res.user);
      } else {
        this.user = null;
        this.loginStatus.next(null);
      }
    });
  }

  user: User | null = null;
  loginStatus = new BehaviorSubject<User | null>(null);

  login(user: { username: string; password: string }): Observable<{ success: boolean; user: User }> {
    const userFormData = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.httpClient.post<{ success: boolean; user: User }>(`${environment.api_url}/login`, userFormData, {
      withCredentials: true,
    }).pipe(
      tap(({ success, user }) => {
        if (success) {
          this.user = user;
          this.loginStatus.next(user);
        }
      })
    );
  }

  checkLogin(): Observable<{ success: boolean; user: User }> {
    return this.httpClient.get<{ success: boolean; user: User }>(`${environment.api_url}/checkLogin`, {
      withCredentials: true,
    });
  }

  logout(): Observable<{ success: boolean }> {
    return this.httpClient.get<{ success: boolean }>(`${environment.api_url}/logout`, {
      withCredentials: true,
    }).pipe(
      tap(({ success }) => {
        if (success) {
          this.user = null;
          this.loginStatus.next(null);
        }
      })
    );
  }

}

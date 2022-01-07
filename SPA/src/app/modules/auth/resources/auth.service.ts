import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { IUser } from './IUser';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;

  helper = new JwtHelperService();

  currentUser: IUser = {
    username: null,
    email: null,
    role: null,
    jobTitle: null
  };
  constructor(private http: HttpClient) {}

  login(model: any): Observable<IUser> {
    return this.http.post(this.baseUrl + 'identity/login', model).pipe(
      map((response: any) => {
        const decodedToken = this.helper.decodeToken(response.token);
                      
        // this.isLoggedIn = response.result.succeeded;
        // this.currentUser.username = response.username;
        // this.currentUser.email = response.email;

        //getting user info from token
        this.currentUser.username = decodedToken.given_name;
        this.currentUser.email = decodedToken.email;
        this.currentUser.jobTitle = decodedToken.jobTitle;
        this.currentUser.role = decodedToken.role;

        localStorage.setItem('token', response.token);
        
        return this.currentUser;
      })
    )
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    this.currentUser = {
      username: null,
      email: null,
      role: null,
      jobTitle: null
    };
    localStorage.removeItem('token');
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'identity/register', model);
  }

  confirmEmail(model: any) {    
    return this.http.post(this.baseUrl + 'identity/confirmemail', model);
  }
}

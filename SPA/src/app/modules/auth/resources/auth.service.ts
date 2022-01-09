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
    firstname: null,
    lastname: null,
    email: null,
    role: null,
    accountType: null
  };
  constructor(private http: HttpClient) {}

  login(model: any): Observable<IUser> {
    return this.http.post(this.baseUrl + 'api/Auth/login', model).pipe(
      map((response: any) => {
        console.log(response);
        const decodedToken = this.helper.decodeToken(response.data.token);
                      
        // this.isLoggedIn = response.result.succeeded;
        // this.currentUser.username = response.username;
        // this.currentUser.email = response.email;

        //getting user info from token
        this.currentUser.firstname = decodedToken.unique_name.split(" ")[0];
        this.currentUser.lastname = decodedToken.unique_name.split(" ")[1];
        this.currentUser.email = decodedToken.email;
        this.currentUser.accountType = decodedToken.AccountType;
        this.currentUser.role = decodedToken.role;

        localStorage.setItem('token', response.data.token);
        
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
      firstname: null,
      lastname: null,
      email: null,
      role: null,
      accountType: null
    };
    localStorage.removeItem('token');
  }

  register(model: any){
    return this.http.post(this.baseUrl + 'api/users/register', model);
  }

  confirmEmail(model: any) {    
    return this.http.post(this.baseUrl + 'api/users/confirm-email', model);
  }
}

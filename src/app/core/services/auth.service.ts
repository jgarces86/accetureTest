import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'http://localhost:3000/users'; // Ajusta la URL según tu configuración de json-server

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

    login(email: string, password: string): Observable<any> {
      return this.http.get<User[]>(`${this.usersUrl}?email=${email}`)
        .pipe(
          map(users => {
            const user = users.find(u => u.password === password);
            if (user) {
              this.userService.setUser(user);
              console.log(user);
              return user;
            } else {
              return throwError(() => new Error('User not found or password does not match'));
            }
          }),
          catchError(error => {
            console.error(error);
            return throwError(() => error);
          })
        );
    }
}

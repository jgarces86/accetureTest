import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  constructor() { }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }

  getCurrentUserId(): number | null {
    const currentUser = this.userSubject.getValue();
    return currentUser ? currentUser.id : null;
  }

}

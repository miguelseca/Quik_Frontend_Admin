import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const STORAGE = window.sessionStorage;
// const STORAGE = window.localStorage;

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    STORAGE.clear();
  }

  public saveToken(token: string): void {
    STORAGE.removeItem(TOKEN_KEY);
    STORAGE.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return STORAGE.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    STORAGE.removeItem(USER_KEY);
    STORAGE.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = STORAGE.getItem(USER_KEY);
    
    if (user) {
      return JSON.parse(user);
    }
    
    return {};
  }
}

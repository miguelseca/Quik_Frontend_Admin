import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Quik';
  user_name = localStorage.getItem('user');

  constructor(private router: Router) {}

  logOut(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!!token) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    }
  }
}

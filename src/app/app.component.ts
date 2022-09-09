
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QUIK - Administration Panel';
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title: string = 'Quik';
//   user_name = localStorage.getItem('user');

//   constructor(private router: Router) {}

//   logOut(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.router.navigateByUrl('/login');
//   }
// }

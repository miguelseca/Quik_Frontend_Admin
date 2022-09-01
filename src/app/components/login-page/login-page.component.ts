import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {
  

  constructor() {
    
   }

  ngOnInit(): void {
  }

}

// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { User } from 'src/app/models/User';
// import { LoginService } from 'src/app/services/login.service';
// import { CONFIG } from 'src/assets/config';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   confirmButtonText: string = CONFIG.confirmButtonText;
//   cancelButtonText: string = CONFIG.cancelButtonText;
//   loginForm: any;

//   constructor(
//     private loginService: LoginService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = new FormGroup({
//       username: new FormControl('', [Validators.required, Validators.minLength(4)]),
//       password: new FormControl('',[Validators.required, Validators.minLength(4)])
//     });
//   }

//   onLogOnClick() {
//     const theUser: User = {
//       username: this.loginForm.value.username,
//       password: this.loginForm.value.password,
//     };

//     this.loginService.login(theUser).subscribe((data) => {
//       localStorage.setItem('token', JSON.stringify(data));
//       console.log('token provided: ' + data);
//       if (!!data)
//         this.logSnacks(${theUser.username} autenticado com sucesso!, 1000);
//       if (!data) this.logSnacks(Autenticação falhou., 5000);
//     });
//   }

//   onCancelClick(): void {
//     this.router.navigateByUrl('/voos');
//   }

//   get username() {
//     return this.loginForm.get('username');
//   }


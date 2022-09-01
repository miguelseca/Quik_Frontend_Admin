import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { CONFIG } from 'src/assets/config';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {


  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}


    loginForm: any;

    ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4)])
    });
  }

    onLogOnClick() {
      const theUser: User = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,

      };




      this.loginService.login(theUser).subscribe((data) => {
        console.log("data received" + data.role);

        localStorage.setItem('token', JSON.stringify(data));
        console.log('token provided: ' + data.token);
        if (!!data)
          this.router.navigateByUrl('/dashboard');
        if (!data) this.logSnacks("Autenticação falhou.", 2000);
      });
    }


    // get username() {
    //   return this.loginForm.get('username');
    // }


    logSnacks(message: string, time: number): void {
      this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
    }

}









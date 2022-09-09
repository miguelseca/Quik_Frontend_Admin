import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginAdminComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().role;
    }
  }

  onSubmit(): void {
    // const { username, password } = this.form;
    const theUser: User = {
      username: this.form.username,
      password: this.form.password,
    };

    this.authService.login(theUser).subscribe((data) => {
      console.log('#########\n', data, '###########');
      console.log('role received ' + data.role);
      console.log('token provided: ' + data.token);
      if (data.role == 'admin') {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        let roles = (this.roles = this.tokenStorage.getUser().role);
        console.log('##########\n', roles, '\n###########');

        // this.reloadPage();
        this.router.navigateByUrl('dashboard');
      } else {
        this.errorMessage = data;
        this.isLoginFailed = true;
        // this.logSnacks('Autenticação falhou. '+`${data}`, 2000);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  // logSnacks(message: string, time: number): void {
  //   this.snackBar.open(message, '', { panelClass: 'snacks', duration: time });
  // }
}

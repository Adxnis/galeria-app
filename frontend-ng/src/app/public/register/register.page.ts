import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = "";
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  passwordConfirm = "";

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  submit(): void {
      this.authService.register( {
      username: this.username,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordConfirm
    } ).subscribe(response => this.router.navigate(['/login']));
  }

}

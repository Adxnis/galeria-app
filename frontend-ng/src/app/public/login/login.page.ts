import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  formSubmitted = false;
  error = false;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  get username(){return this.form.get('username');}
  get password(){return this.form.get('password');}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  submit(): void {

    this.formSubmitted = true;
    if (this.form.status === "VALID") {
      this.authService.login(this.form.getRawValue()).subscribe(
        data => {
        this.router.navigate(['/home']);
        this.error = false;
        },
        (err) => { this.error = true, this.errorMessage = err.error.error}
      )
    }
  }
}
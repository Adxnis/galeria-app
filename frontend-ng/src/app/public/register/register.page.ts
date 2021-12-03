import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  formSubmitted = false;
  error = false;
  errorMessage: string;
  invalidEmailMessage: string

  get username(){return this.form.get('username');}
  
  get first_name(){return this.form.get('first_name');}

  get last_name(){return this.form.get('last_name');}
  
  get email(){return this.form.get('email');}

  get password(){return this.form.get('password');}
  
  get password_confirm(){return this.form.get('password_confirm');}
  
  constructor(
    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    })
  }



  submit(): void {
    this.formSubmitted = true;
    if (this.form.status === "VALID") {
      this.authService.register(this.form.getRawValue()).subscribe(
        data => {
        this.error = false;
        this.form.reset;
        this.router.navigate(['/login']);
        },
        (err) => { 
          console.log(err.error), 
          this.error = true, 
          this.invalidEmailMessage = err.error?.errors?.email;
          this.errorMessage = err.error.message}
      )
    }
  }

}

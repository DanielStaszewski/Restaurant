import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  registerForm: FormGroup;
  loginForm: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  createRegisterForm(): void{
    this.registerForm = this.formBuilder.group({
      'username': [''],
      'email': [''],
      'password': ['']
    });
  }

  createLoginForm(): void{
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  onLoginSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.isLoading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(email, password)
      .subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (errorMessage: string) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      )
  }

  onRegisterSubmit(){
    if(!this.registerForm.valid){
      return;
    }
    this.isLoading = true;

    const username = this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    
    this.authService.register(username, email, password)
      .subscribe(
        (response) => {
          console.log(response);
          this.isLoading = false;
        },
        (errorMessage: string) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      )
  }


  



}

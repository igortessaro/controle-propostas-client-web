import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  returnUrl: string;
  error = '';
  invalidLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthenticationService) { }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    // if (this.loginForm.controls.email.value === 'dhiraj@gmail.com' && this.loginForm.controls.senha.value === 'password') {
    //   this.router.navigate(['home']);
    // } else {
    //   this.invalidLogin = true;
    // }

    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.senha.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  logged(){
    return this.authService.logged();
  }
}
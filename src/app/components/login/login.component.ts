import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginIncorret = false;

  constructor(private formBuilder: FormBuilder,  private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    if(this.authService.login(this.f.username.value, this.f.password.value)){
      this.loginIncorret = false;
      this.router.navigate(["/planets"]);
    }
    else{
      this.loginIncorret = true;
    }
  }

}

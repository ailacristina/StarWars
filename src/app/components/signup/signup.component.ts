import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  errorUsername: string;
  signupIncorrect: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.f.username.valueChanges.pipe(debounceTime(1000)).subscribe(res => {
      this.authService.checkUsername(res).subscribe(response => {

        if (response.status === "success") {
          this.errorUsername = null;
        }
        else if (response.status === "error") {
          this.errorUsername = response.error_message;
        }
      })
    });
  }

  get f() { return this.registerForm.controls; }


  signup() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    let user = { name: this.f.firstName.value, lastName: this.f.lastName.value, username: this.f.username.value, password: this.f.password.value };

    this.authService.signIn(user).subscribe(response => {

      if (response.status === "success") {
        if (this.authService.login(this.f.username.value, this.f.password.value)) {
          this.router.navigate(["/planets"]);
        }
        else {
          this.signupIncorrect = true;
        }
      }
    })
  }

}

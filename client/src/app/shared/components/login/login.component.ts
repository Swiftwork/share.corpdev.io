import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'c-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    '[class.c-login]': 'true',
  },
})
export class LoginComponent implements OnInit {

  static EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(LoginComponent.EMAIL_REGEXP)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) return;

    let params = {
      email: form.value.email,
      password: form.value.password,
    };

    this.authService.login(params)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}

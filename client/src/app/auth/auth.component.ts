import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'c-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  static EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  public loginForm: FormGroup;

  constructor(
    private http: Http,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(AuthComponent.EMAIL_REGEXP)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) return;

    let details = {
      email: form.value.email,
      password: form.value.password,
    }

    const request = this.http.post('/api/login', details).map(
      res => {
        return res.json() || {};
      }
    ).catch(
      err => {
        console.error(err);
        return Observable.throw(err);
      }
      );

    request.subscribe(res => {
      console.log(res);
    });
  }
}
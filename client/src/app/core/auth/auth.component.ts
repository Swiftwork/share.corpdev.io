import { Component } from '@angular/core';

@Component({
  selector: 'c-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  host: {
    '[class.c-auth]': 'true',
  },
})
export class AuthComponent {
}

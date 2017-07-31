import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'c-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  host: {
    '[class.c-topbar]': 'true',
  },
})
export class TopbarComponent implements OnInit {

  public searchForm: FormGroup;
  public user: any;

  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user') || null);
    if (user) {
      this.userService.get(user.id).subscribe((user) => {
        this.user = user;
      });
    }

    this.searchForm = new FormGroup({
      query: new FormControl('', [Validators.required]),
    });
  }

  search() {
    console.log('search');

    return false;
  }
}

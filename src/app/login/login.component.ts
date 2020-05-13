import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.auth.login(f.value.username, f.value.password);
  }

  get isAuthenticated(): boolean { return this.auth.isAuthenticated(); }

  get user(): UserModel { return this.auth.getUser(); }

}

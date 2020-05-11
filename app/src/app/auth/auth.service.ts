import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserModel } from '../shared/user.model';

const api = environment.baseAppUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _user: UserModel;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        this.http.post<UserModel>(api + '/auth', {
            username: username,
            password: password
        })
            .subscribe(user => {
                this._user = user;
                console.log(this._user);
            }, error => {
                this._user = null;
            });
    }

    logout() {
        this._user = null;
    }

    isAuthenticated() : boolean {
        return this._user != null && this._user.id > 0;
    }

    getUser() {
        return this._user;
    }
}
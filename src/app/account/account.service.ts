import { Http } from 'src/app/helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class AccountService {
    constructor(private http: Http) { }

    register(data: any) {
        return this.http.writeApi.post('register', data);
    }

    login(data: any) {
        return this.http.writeApi.post('login', data);
    }

    profile() {
        return this.http.readApi.get('profile');
    }

    forgot(data: any) {
        return this.http.writeApi.post('forgot', data);
    }

    password(data: any) {
        return this.http.writeApi.post('password', data);
    }
}
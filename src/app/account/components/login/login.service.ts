import { Http } from '../../../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class LoginService {
    constructor(private http: Http) { }

    login(data: any) {
        return this.http.writeApi.post('login', data);
    }

    profile(){
        return this.http.readApi.get('profile');
    }
}
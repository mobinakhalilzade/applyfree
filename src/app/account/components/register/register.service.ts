import { Http } from 'src/app/helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class RegisterService {
    constructor(private http: Http) { }

    register(data: any) {
        return this.http.writeApi.post('register', data);
    }
}
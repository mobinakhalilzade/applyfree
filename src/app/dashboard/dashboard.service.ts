import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: Http) { }

    bookmarks() {
        return this.http.readApi.get('bookmarks');
    }

    profile() {
        return this.http.readApi.get('profile');
    }

    contracts(data: any) {
        return this.http.readApi.getByParam('contracts', data);
    }

    signatures(data: any) {
        return this.http.readApi.getByParam('signatures', data);
    }

    signature(data: any) {
        return this.http.writeApi.post('signature/add', data);
    }

    removeSignature(data: any) {
        return this.http.writeApi.post('signature/delete', data);
    }

    contract(data: any) {
        return this.http.readApi.getById('contract', data);
    }

    pay(data: any) {
        return this.http.writeApi.post('pay', data);
    }

    logout(){
        return this.http.writeApi.post('logout');
    }
}
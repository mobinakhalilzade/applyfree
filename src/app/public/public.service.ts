import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PublicService {
    constructor(private http: Http) { }

    contracts(data: any) {
        return this.http.readApi.getByParam('contracts/search', data);
    }

    notify(data: any) {
        return this.http.writeApi.post('notify', data);
    }

    contract(data: any) {
        return this.http.readApi.getById('contract', data);
    }

    sendConfirmEmail(data: any) {
        return this.http.writeApi.post('contract/confirm', data);
    }

    sign(data: any) {
        return this.http.writeApi.post('contract/sign', data);
    }

    agreement(data: any) {
        return this.http.writeApi.post('contract/secondPartyAgreement', data);
    }
}
import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ContractService {
    constructor(private http: Http) { }

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
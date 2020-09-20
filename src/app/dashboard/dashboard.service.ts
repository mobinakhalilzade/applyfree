import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
    constructor(private http: Http) { }

    profile() {
        return this.http.readApi.get('profile');
    }

    contracts(data: any) {
        return this.http.readApi.getByParam('contracts', data);
    }

    reserved(data: any) {
        return this.http.readApi.getByParam('contracts/reserved', data);
    }

    removeContract(data: any) {
        return this.http.writeApi.post('contract/delete', data);
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

    tags(data: any) {
        return this.http.readApi.getById('tag', data)
    }

    tag(data: any) {
        return this.http.writeApi.post('tag/add', data);
    }

    deleteTag(data: any) {
        return this.http.writeApi.post('tag/delete', data);
    }

    startContract(data: any) {
        return this.http.writeApi.post('contract/start', data);
    }

    lockContract(data: any) {
        return this.http.readApi.getById('contract/lock', data);
    }   
    
    agreement(data: any) {
        return this.http.writeApi.post('contract/firstPartyAgreement', data);
    }

    documentation(data: any) {
        return this.http.writeApi.post('contract/documentation', data);
    }

    pay(data: any) {
        return this.http.writeApi.post('pay', data);
    }

    logout(){
        return this.http.writeApi.post('logout');
    }
}
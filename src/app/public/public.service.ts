import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PublicService {
    constructor(private http: Http) { }

    programBookmark(data: any) {
        return this.http.readApi.getById('program/bookmark', data);
    }

    removeBookmark(data:any){
        return this.http.writeApi.post('bookmark/delete',data);
    }

    addBookmark(data: any) {
        return this.http.writeApi.post('bookmark/add', data);
    }

    countries() {
        return this.http.readApi.get('countries');
    }

    length() {
        return this.http.readApi.get('length');
    }

    programs(data: any) {
        return this.http.readApi.getByParam('programs', data);
    }

    program(data: any) {
        return this.http.readApi.getById('programs', data);
    }

    categories() {
        return this.http.readApi.get('categories');
    }

    schools() {
        return this.http.readApi.get('schools');
    }

    schoolsType() {
        return this.http.readApi.get('schools/type');
    }

    tuition() {
        return this.http.readApi.get('tuition');
    }

    costInYear() {
        return this.http.readApi.get('costInYear');
    }

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
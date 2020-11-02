import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class PublicService {
    constructor(private http: Http) { }

    join(data: any) {
        return this.http.writeApi.post('group/join', data)
    }

    agents() {
        return this.http.readApi.get('agents');
    }

    programBookmark(data: any) {
        return this.http.readApi.getById('program/bookmark', data);
    }

    intake(data: any) {
        return this.http.readApi.getById('program/intake', data);
    }

    removeBookmark(data: any) {
        return this.http.writeApi.post('bookmark/delete', data);
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
        return this.http.readApi.getByParam('program', data);
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

    sign(data: any) {
        return this.http.writeApi.post('contract/sign', data);
    }

    contract(data: any) {
        return this.http.readApi.getById('contract', data);
    }

    profile() {
        return this.http.readApi.get('profile');
    }

    group() {
        return this.http.readApi.get('group');
    }
}
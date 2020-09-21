import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ContractListService {
    constructor(private http: Http) { }

    contracts(data: any) {
        return this.http.readApi.getByParam('contracts/search', data);
    }

}
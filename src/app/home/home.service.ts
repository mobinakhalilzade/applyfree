import { Http } from '../helper/http';
import { Injectable } from '@angular/core'; 

@Injectable({
    providedIn: 'root',
})

export class HomeService {
    constructor(private http: Http) { }

}
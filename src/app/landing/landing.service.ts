import { Http } from '../helper/http';
import { Injectable } from '@angular/core'; 

@Injectable({
    providedIn: 'root',
})

export class LandingService {
    constructor(private http: Http) { }

}
import { Http } from '../helper/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: Http) { }

  payment(data: any) {
    return this.http.writeApi.post('payment', data);
  }

  token() {
    return this.http.readApi.get('token');
  }
}

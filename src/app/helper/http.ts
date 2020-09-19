import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from "../config/urls";

@Injectable({
    providedIn: 'root'
})

export class Http {
    readonly stateEnum: typeof urls = urls;

    options = {
        'Content-Type': 'application/json'
    }

    httpHeaders = new HttpHeaders(this.options);

    updateHeader(token: any) {
        this.httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Token': token
        });
    }

    constructor(private http: HttpClient) {
        if (localStorage.getItem("token") != null) {
            this.options["Token"] = localStorage.getItem("token");
        }
    }

    readApi = {
        get: (controller: string) => {
            return this.http.get(`${urls.api}${controller}`, {
                observe: 'events',
                headers: this.httpHeaders
            });
        },
        getById: (controller: string, id: string) => {
            return this.http.get(`${urls.api}${controller}/${id}`, {
                observe: 'events',
                headers: this.httpHeaders
            });
        },
        getByParam: (controller: string, params: any) => {
            return this.http.get(`${urls.api}${controller}`, {
                params: params,
                observe: 'events',
                headers: this.httpHeaders
            });
        }
    }

    writeApi = {
        post: (controller: string, command: any = null) => {
            return this.http.post(`${urls.api}${controller}`, command, {
                observe: 'events',
                headers: this.httpHeaders
            });
        },
        put: (controller: string, command: any) => {
            return this.http.put(`${urls.api}${controller}`, command, {
                observe: 'events',
                headers: this.httpHeaders
            });
        },
        delete: (controller: string, param: any) => {
            return this.http.delete(`${urls.api}${controller}`, {
                observe: 'events',
                headers: this.httpHeaders,
                params: param
            });
        }
    }
}

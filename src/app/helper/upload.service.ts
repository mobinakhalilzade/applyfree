import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';

import { urls } from "../config/urls";
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    readonly stateEnum: typeof urls = urls;

    constructor(private httpClient: HttpClient) { }

    public upload(controller: any, formData: any) {
        return this.httpClient.post<any>(`${urls.api}${controller}`, formData, {
            headers: {
                'token': localStorage.getItem("token")
            },
            reportProgress: true,
            observe: 'events'
        });
    }

    public uploader(file: any, controller: any, then: any) {
        const formData = new FormData();
        formData.append('image', file.data);
        file.inProgress = true;
        this.upload(controller, formData).pipe(map(event => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    file.progress = Math.round(event.loaded * 100 / event.total);
                    break;
                case HttpEventType.Response:
                    return event;
            }
        }),
            catchError((error: HttpErrorResponse) => {
                file.inProgress = false;
                return of({ return: 300, message: 'error' });
            })).subscribe((event: any) => {
                then(event);
            });
    }
}

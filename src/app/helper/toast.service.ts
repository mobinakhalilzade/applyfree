import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor(
    private event: EventService,
  ) { }

  show(header: string, body: string, options: any = {}) {
    this.toasts.push({ header, body, ...options });
    this.event.put({ request: 'toasts', data: this.toasts });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
    this.event.put({ request: 'toasts', data: this.toasts });
  }

}

import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: any[] = []
  @Output() listener = new EventEmitter<any[]>();

  constructor() { }

  put(input: any) {
    let request = this.events.find(x => x.request == input.request);
    if (request == undefined) {
      this.events.push(input);
    } else {
      request.data = input.data
    }
    this.listener.emit(this.events);
  }

  get(request: string) {
    return this.events.find(x => x.request == request);
  }
}

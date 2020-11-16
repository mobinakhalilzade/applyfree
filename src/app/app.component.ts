import { Component, OnInit } from '@angular/core';
import { EventService } from './helper/event.service';
import { ToastService } from './helper/toast.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toasts: any[] = [];

  constructor(
    private toast: ToastService,
    private event: EventService
  ) { }

  remove(toast: any) {
    this.toast.remove(toast);
  }

  ngOnInit(): void {
    this.event.listener.subscribe((response: any) => {
      const $request = this.event.get('toasts');
      if ($request) {
        this.toasts = $request.data;
      }
    });

    var ua = navigator.userAgent;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
      $('body').addClass('mobile');
    }
    else if (/Chrome/i.test(ua)) {
      $('body').addClass('desktop chrome');
    }
    else {
      $('body').addClass('desktop other');
    }
  }

}

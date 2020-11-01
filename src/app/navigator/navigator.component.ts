import { Component, OnInit } from '@angular/core';
import { EventService } from '../helper/event.service';
import { PublicService } from '../public/public.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  loading: boolean = true;
  user: any;
  sidebar: boolean;
  constructor(
    private event: EventService,
    private service: PublicService,
  ) { }

  profile() {
    this.service.profile().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.user = body.data
          this.event.put({ request: 'user', data: body.data });
        }

        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.profile();

    this.event.listener.subscribe((response: any) => {
      if (response.request == 'profile') {
        this.profile();
      }
    });
  }

}

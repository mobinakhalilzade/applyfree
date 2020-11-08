import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EventService } from '../helper/event.service';
import { PublicService } from '../public/public.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  loading: boolean = true;
  user: any;
  sidebar: boolean;
  isBrowser: boolean
  constructor(
    private event: EventService,
    private service: PublicService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }

  profile() {
    this.service.profile().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.user = body.data

          if (this.isBrowser) {
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        }

        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.profile();
  }

}

import { Component, ElementRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
 
  sidebar: boolean;
  readMore:boolean;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
  }

  closeModal() {
    $('#info').modal('hide');
    localStorage.setItem('notify', 'yes');
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      if (localStorage.getItem('notify')) {
        $('#info').modal('hide');
      }
      else {
        $('#info').modal('show');
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  sidebar: boolean; 

  constructor() { }

  closeModal(){
    $('#info').modal('hide');
  }

  ngOnInit(): void {
    $('#info').modal('show');
  }

}

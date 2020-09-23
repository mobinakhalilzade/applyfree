import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as data from 'src/assets/data.json';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  section: string;
  faq = data['default'][1]['data'];
  team = data['default'][2]['data'];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      this.section = this.route.snapshot.params.section;
    });
  }

  ngOnInit(): void {
    this.section = this.route.snapshot.params.section;
  }

}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmark: any;

  constructor(
    private service: DashboardService
  ) { }

  bookmarks() {
    this.service.bookmarks().subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return = 200) {
          this.bookmark = body.data;
        }
      }
    });
  }

  ngOnInit(): void {
    this.bookmarks();

  }
}

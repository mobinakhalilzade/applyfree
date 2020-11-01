import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  bookmark: any;
  loading: boolean = true;

  constructor(
    private service: DashboardService
  ) { }

  bookmarks() {
    this.service.bookmarks().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.loading = false;
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

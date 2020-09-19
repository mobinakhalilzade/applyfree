import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from "./dashboard.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuth: boolean = true;
  user: any;
  constructor(public router: Router, private service: DashboardService) { }

  profile() {
    this.service.profile().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.user = body.data
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.isAuth && localStorage.getItem('token') == null) {
      this.router.navigate(['/account/login']);
      return;
    }

    this.profile();
  }
}

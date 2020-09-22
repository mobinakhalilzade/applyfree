import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from "./dashboard.service";
import * as menu from 'src/assets/data.json';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuth: boolean = true;
  user: any;
  menus = menu['default'][0]['data'];
  subMenus: any[] = this.menus[0]['menus'];

  constructor(public router: Router, private service: DashboardService) { }

  logout() {
    this.service.logout().subscribe((response: any) => {
      console.log(response);
      localStorage.removeItem('token');
      this.router.navigate(['account/login']);
    });
  }

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

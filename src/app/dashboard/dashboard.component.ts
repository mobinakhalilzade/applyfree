import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from "./dashboard.service";
import * as menu from 'src/assets/data.json';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  isAuth: boolean = true;
  user: any;
  menus = menu['default'][0]['data'];
  subMenus: any[] = this.menus[0]['menus'];

  @ViewChild('tooltip') public tooltip: NgbTooltip;

  constructor(
    public router: Router,
    private service: DashboardService
  ) {
  }

  logout() {
    this.service.logout().subscribe((response: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.tooltip.open();
    }, 1000);
}

  ngOnInit(): void {
    if (this.isAuth && localStorage.getItem('token') == null) {
      this.router.navigate(['/account/login']);
      return;
    }
    this.profile();
  }
}

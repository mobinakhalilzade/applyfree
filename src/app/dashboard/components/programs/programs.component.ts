import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: any;
  loading: boolean = true;

  constructor(
    private service: DashboardService,
    public router: Router

  ) { }

  getPrograms() {
    this.service.programs().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.programs = body.data;
          this.loading = false;
        }
      }
    });
  }

  ngOnInit() {
    this.getPrograms();
  }

}

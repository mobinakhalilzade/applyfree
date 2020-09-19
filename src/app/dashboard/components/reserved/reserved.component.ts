import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent implements OnInit {
  loading: boolean = true;
  data: any[];
  inlineModal: boolean;
  selectedId: any;
  constructor(private service: DashboardService, public router: Router) { }

  contracts() {
    const params = {
      page: 1 //this should be dynamic
    }

    this.service.reserved(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.data = body.data;
          this.loading = false;
        }
      }
    });
  }

  confirm(id: any) {
    this.selectedId = id;
    this.inlineModal = true;
  }

  remove() {
    this.service.removeContract({ id: this.selectedId }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.contracts();
        }
      }
    });
  }

  ngOnInit(): void {
    this.contracts();
  }
}

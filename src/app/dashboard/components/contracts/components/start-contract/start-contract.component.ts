import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-contract',
  templateUrl: './start-contract.component.html',
  styleUrls: ['./start-contract.component.css']
})
export class StartContractComponent implements OnInit {
  loading: boolean;
  alert: any;
  form = {
    title: null
  }
  constructor(private service: DashboardService, private router: Router) { }

  proccess() {
    this.loading = true;

    this.service.startContract({ title: this.form.title }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.router.navigate(['/dashboard/contracts/modify', body.contract_id]);
        }

        if (body.return == 301) {
          this.alert = body;
          this.loading = false;
        }
      }
    })
  }

  ngOnInit(): void {
  }

}

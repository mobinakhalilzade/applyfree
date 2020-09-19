import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  alert: any;
  contractId: number;
  constructor(private service: DashboardService, private route: ActivatedRoute) { }

  lockContract(code: any) {
    this.service.lockContract(code).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.alert = body;
        if (body.return == 200) {
          this.contractId = body.contractId;
        }
      }
    });
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.lockContract(code);
  }


}

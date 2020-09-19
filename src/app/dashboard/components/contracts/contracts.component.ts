import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  loading: boolean = true;
  btnLoading: boolean;
  data: any[];
  inlineModal: boolean;
  selectedId: any;
  constructor(private service: DashboardService, public router: Router) { }

  contracts() {
    const params = {
      page: 1 //this should be dynamic
    }

    this.service.contracts(params).subscribe((response: any) => {
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

  agreement(item: any) {
    this.btnLoading = true;
    const command = {
      contractId: item.id
    }

    this.service.agreement(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.btnLoading = false;
        if (body.return == 200) {
          item.firstPartyConfirm = true;
        }
      }
    });
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

  pay(item: any) {
    this.service.pay({ contract_id: item.id }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          //TODO: *

        }
      }
    });
  }

  print(item: any){}

  ngOnInit(): void {
    this.contracts();
  }

}

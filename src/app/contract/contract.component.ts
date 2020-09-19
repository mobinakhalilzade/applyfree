import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  loading: boolean;
  alert: any;
  data: any;
  reservedByThisUser: boolean;
  constructor(private service: ContractService, private route: ActivatedRoute) { }

  contract(id: any) {
    this.service.contract(id).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.data = body.data;
          this.reservedByThisUser = body.reservedByThisUser;
        }
      }
    });
  }

  confirm() {
    this.loading = true;
    const command = {
      contractId: this.route.snapshot.paramMap.get('id')
    }

    this.service.sendConfirmEmail(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.alert = body;
        this.loading = false;
      }
    });
  }

  agreement() {
    this.loading = true;
    const command = {
      contractId: this.route.snapshot.paramMap.get('id')
    }

    this.service.agreement(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        this.alert = body;
        this.loading = false;
        if(body.return == 200){
          this.data.secondPartyConfirm = true;
        }
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.contract(id);
  }

}

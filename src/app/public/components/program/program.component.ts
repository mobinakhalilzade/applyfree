import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  loading: boolean;
  alert: any;
  data: any;
  reservedByThisUser: boolean;
  constructor(private service: PublicService, private route: ActivatedRoute) { }

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

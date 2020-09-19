import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
import { urls } from 'src/app/config/urls';

@Component({
  selector: 'app-signatures',
  templateUrl: './signatures.component.html',
  styleUrls: ['./signatures.component.css']
})
export class SignaturesComponent implements OnInit {
  readonly stateEnum: typeof urls = urls;

  loading: boolean = true;
  removeLoad: boolean;
  data: any[];
  alert: any;
  inlineModal: boolean;
  selectedId: any;

  urls = urls;

  constructor(private service: DashboardService, public router: Router) { }

  signatures() {
    const params = {
      page: 1 //this should be dynamic
    }

    this.service.signatures(params).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.data = body.data;
          this.loading = false;
          this.removeLoad = false;
        }
      }
    });
  }

  remove() {
    this.removeLoad = true;
    this.service.removeSignature({ id: this.selectedId }).subscribe((response: any) => {
      console.log(response)
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.signatures();
        }

        if (body.return == 300) {
          this.alert = body;
          this.removeLoad = false;
        }
      }
    });
  }

  confirm(id: any) {
    this.selectedId = id;
    this.inlineModal = true;
  }

  ngOnInit(): void {
    this.signatures();
  }

}

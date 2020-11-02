import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../../../helper/event.service';


@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  program: any;
  user: any;
  intake: any;
  contract: any;
  loading: boolean;

  constructor(
    private service: DashboardService,
    private event: EventService,
    private route: ActivatedRoute
  ) { }

  getProgram(id: string, slug: string, then: any) {
    this.service.program({ id: id, slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.program = data;
          then();
        }
      }
    })
  }

  getIntake(id: any) {
    this.service.intake(id).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.intake = data;
          // this.loading = false;
        }
      }
    })
  }

  getContract(intakeId: any) {
    this.service.contract(intakeId).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.contract = data;
        }
      }
    })
  }


  ngOnInit(): void {

    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    const intakeId = this.route.snapshot.paramMap.get('intakeId');
    this.getProgram(id, slug, () => {
      this.event.listener.subscribe(() => {
        const $request = this.event.get('user');
        if ($request) {
          this.user = $request.data;
        }
      });

      const profile = setInterval(() => {
        if (this.user == null) {
          this.event.put({ request: 'profile' });
        } else {
          clearInterval(profile);
        }
      }, 2000);

      this.getIntake(intakeId);
      this.getContract(intakeId);
    });
  }
}

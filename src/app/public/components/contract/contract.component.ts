import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../helper/toast.service';
import { EventService } from '../../../helper/event.service';
import { PublicService } from '../../public.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  loading: boolean = true;
  program: any;
  intake: any;
  contract: any;
  group: any;
  user: any = null;
  programSlug: string;
  programId: string;
  intakeId: string;
  progress = {
    description: 'loading contract ...',
    loading: 0
  }
  form = {
    code: null,
    student: 0
  }
  constructor(
    private toast: ToastService,
    private event: EventService,
    private service: PublicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getIntake(id: any, then = null) {
    this.service.intake(id).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.intake = data;
          this.progress['loading'] = 95;
          then();
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
          this.progress['loading'] = 100;
          this.loading = false;
        }
      }
    })
  }

  sign() {
    const intakeId = this.route.snapshot.paramMap.get('intakeId');

    const command = {
      intake_id: intakeId,
      code: this.form.code,
      student: this.form.student
    }

    this.service.sign(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.toast.show('Contract', body.message, { classname: 'bg-success text-light' });
          //window.location.href = `/payment/checkout?c=${body.contractId}`
        }

        if (body.return == 300) {
          this.toast.show('Contract', body.message, { classname: 'bg-danger text-light' })
        }

        if (body.return == 401) {
          window.location.href = '/account/login'
        }
      }
    })
  }

  getGroup() {
    this.service.group().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.group = data;
          this.loading = false;
          this.progress['loading'] = 100;
        }
      }
    })
  }

  ngOnInit(): void {
    const intakeId = this.route.snapshot.paramMap.get('intakeId');

    this.intake = intakeId;

    this.progress['loading'] = 20;
    this.progress['description'] = 'loading intake ...';

    this.getIntake(intakeId, () => {
      const token = localStorage.getItem('token');

      if (token) {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
          this.user = user;
        }

        if (this.user && this.user.role == 1) {
          this.progress['description'] = 'loading contract ...';
          this.getContract(intakeId);
        } else if (this.user && this.user.role == 2) {
          this.progress['description'] = 'loading group ...';
          this.getGroup();
        }

      } else {
        this.loading = false;
      }

    });
  }

}

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
  user: any = null;
  progress = {
    description: 'loading contract ...',
    loading: 0
  }
  form = {
    code: null
  }
  constructor(
    private toast: ToastService,
    private event: EventService,
    private service: PublicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  getProgram(id: string, slug: string, then: any) {
    this.service.program({ id: id, slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.program = data;
          this.progress['loading'] = 80;
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
      code: this.form.code
    }

    this.service.sign(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
            this.toast.show('Contract', body.message, { classname: 'bg-success text-light' })
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

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    const intakeId = this.route.snapshot.paramMap.get('intakeId');
    this.progress['loading'] = 50;
    this.getProgram(id, slug, () => {
      this.event.listener.subscribe(() => {
        const $request = this.event.get('user');
        if ($request) {
          this.user = $request.data;
          this.progress['description'] = 'loading intake ...';
          this.progress['loading'] = 90;
          this.getIntake(intakeId);
        }
      });

      const profile = setInterval(() => {
        if (this.user == null) {
          this.event.put({ request: 'profile' });
        } else {
          clearInterval(profile);
        }
      }, 2000);
    });
  }

}

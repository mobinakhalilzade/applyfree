import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ToastService } from '../../../helper/toast.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  agents: any;
  loading: boolean = true;
  input = {
    advisor: {
      value: '',
      result: null
    }
  }
  progress = {
    description: 'loading advisors ...',
    loading: 0
  }

  constructor(
    private service: PublicService,
    private toast: ToastService
  ) {
  }

  join(code: any) {
    const command = {
      code: code
    }
    this.service.join(command).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.toast.show('Agent', body.message, { classname: 'bg-dark text-light' });
        }
        else {
          this.toast.show('Agent', body.message, { classname: 'bg-dark text-light' });
        }
      }
    })
  }

  getAgents() {
    this.service.agents().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.agents = body.data;
          this.progress['loading'] = 100;
          this.loading = false;
        }
      }
    })
  }

  ngOnInit(): void {
    this.progress['loading'] = 50;
    this.getAgents();
  }

}

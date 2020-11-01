import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../../public.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  loading: boolean;
  program: any;
  user: any;

  constructor(
    private service: PublicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  profile() {
    this.service.profile().subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.user = body.data
        }
      }
    });
  }

  getProgram(id: string, slug: string) {
    this.service.program({ id: id, slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.program = data;
          console.log(data)
        }
      }
    })
  }

  sign() {
    const intakeId = this.route.snapshot.paramMap.get('intakeId');

    const command = {
      intake_id: intakeId,
      code: null
    }

    this.service.sign(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          console.log(response)
        }
      }
    })
    // let logedIn = localStorage.getItem('token');
    // if (logedIn) {

    // } else {
    //   this.router.navigate(['/account/login']);
    // }
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    const intakeId = this.route.snapshot.paramMap.get('intakeId');
    this.getProgram(id, slug);
    this.profile();
  }

}

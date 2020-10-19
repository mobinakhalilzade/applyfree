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
  ProgramDetail: any;
  intakes: any;
  school: any;

  constructor(private service: PublicService, 
    private route: ActivatedRoute) 
    { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.service.programs().subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          let detail = body.data;
          this.ProgramDetail = detail.find(x => x.id == id);
          this.intakes = this.ProgramDetail.intakes;
          this.school = this.ProgramDetail.school;

        }
      }
    })
  }
}

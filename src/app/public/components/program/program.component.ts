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
    private route: ActivatedRoute) { }

  program(slug: string) {
    this.service.program(slug).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          console.log(body);
        }
      }
    })
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.program(slug);
  }
}

import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../public.service';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  loading: boolean;
  alert: any;
  program: any;

  constructor(private service: PublicService,
    private route: ActivatedRoute) { }

  getProgram(slug: string) {
    this.service.program(slug).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.program = body.data;
          this.program.school.banner = this.program.school.banner;
          $('head').append('<style  id="sh">:root {--bg-image: url("http://192.168.3.65/applyfree/img/banner/' + this.program.school.banner + '")}</style>')
          console.log(body);
        }
      }
    })
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.getProgram(slug);
  }
}

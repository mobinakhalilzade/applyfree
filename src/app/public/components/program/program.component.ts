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
  bookmarked: boolean;

  constructor(private service: PublicService,
    private route: ActivatedRoute) { }

  programBookmark(id: any) {
    this.service.programBookmark(id).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.bookmarked = body.status;
        }
      }
    });
  }

  bookmark() {
    const command = {
      program_id: this.program.id
    }

    if (this.bookmarked) {
      this.service.removeBookmark(command).subscribe((response: any) => {
        if (response.status == 200) {
          const body = response.body;
          if (body.return == 200) {
            this.bookmarked = false;
          }
        }
      });
    }
    else {
      this.service.addBookmark(command).subscribe((response: any) => {
        if (response.status == 200) {
          const body = response.body;
          if (body.return == 200) {
            this.bookmarked = true;
          }
        }
      });
    }
  }

  getProgram(id: string, slug: string) {
    this.service.program({ id: id, slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          this.programBookmark(data.id);
          this.program = data;
          this.program.school.banner = this.program.school.banner;
          // $('head').append('<style  id="sh">:root {--bg-image: url("http://192.168.3.65/applyfree/img/banner/' + this.program.school.banner + '")}</style>')
          // console.log(body);
        }
      }
    })
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(id, slug);
  }
}

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
  program: any;
  bookmarked: boolean;
  successBookmarked: any;

  constructor(private service: PublicService,
    private route: ActivatedRoute) { }

  getProgram(id: string, slug: string, then: any) {
    this.service.program({ id: id, slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          data.school.googleMap = 'https://www.google.com/maps/search/?api=1&query=' + data.school.address;
          this.program = data;
          then();
        }
      }
    })
  }

  userBookmark(id: any) {
    this.service.programBookmark(id).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.bookmarked = body.status;
        }
      }
    });
  }

  private removeBookmark(command: any) {
    this.service.removeBookmark(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.bookmarked = false;
        }
      }
    });
  }

  private signBookmark(command: any) {
    this.service.addBookmark(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.bookmarked = true;
          this.successBookmarked = body;
          setTimeout(() => {
            this.successBookmarked=null;
          }, 3000);
        }
      }
    });
  }

  bookmark() {
    const command = {
      program_id: this.program.id
    }

    this.bookmarked ? this.removeBookmark(command) : this.signBookmark(command);
  }

  async map() {
  
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = this.route.snapshot.paramMap.get('id');
    this.getProgram(id, slug, () => {
      this.userBookmark(id);
      setTimeout(() => {
          this.map();
      }, 1000);
    });


  }
}

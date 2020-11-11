import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../public.service';
import { ToastService } from '../../../helper/toast.service';
import { urls } from "../../../config/urls";

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  loading: boolean = true;
  url: typeof urls = urls;
  alert: any;
  program: any;
  bookmarked: boolean;
  successBookmarked: any;
  progress = {
    description: "Loading program",
    loading: 0
  }

  constructor(
    private service: PublicService,
    private route: ActivatedRoute,
    private toast: ToastService,) { }

  getProgram(slug: string, then: any) {
    this.service.program({ slug: slug }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          const data = body.data;
          data.school.googleMap = 'https://www.google.com/maps/search/?api=1&query=' + data.school.address;
          this.program = data;
          this.loading = false;
          then(data);
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
          this.toast.show('Program', body.message, { classname: 'bg-success text-light' })
        }
        if (body.return > 200) {
          this.toast.show('Program', body.message, { classname: 'bg-danger text-light' })
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
          this.toast.show('Program', body.message, { classname: 'bg-success text-light' })
        }
        if (body.return > 200) {
          this.toast.show('Program', body.message, { classname: 'bg-danger text-light' })
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

  ngOnInit(): void {
    this.progress = {
      description: "Loading program",
      loading: 50
    }
    const slug = this.route.snapshot.paramMap.get('slug');
    this.getProgram(slug, (data: any) => {
      this.userBookmark(data.id);
      this.progress = {
        description: "Loading program",
        loading: 50 * 2
      }
    });
  }
}

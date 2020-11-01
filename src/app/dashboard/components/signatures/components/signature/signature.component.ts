import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../../../helper/upload.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  @ViewChild("fileUpload", { static: false })
  fileUpload: ElementRef;
  file = {};
  loading: boolean;
  alert: any;
  form = {
    image: null
  }
  constructor(
    private uploadService: UploadService,
    private service: DashboardService, private router: Router) { }

  upload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.loading = true;
      this.file = { data: fileUpload.files[0], inProgress: false, progress: 0 };
      this.fileUpload.nativeElement.value = '';
      this.uploadService.uploader(this.file, 'signature/add', (response: any) => {
        if (response != undefined) {
          const body = response.body;
          if (body.return == 200) {
            window.location.href = '/dashboard/signatures';
          }

          if (body.return == 300) {
            this.alert = body;
          }
        }
      })
    };
  }

  ngOnInit(): void {
  }
}

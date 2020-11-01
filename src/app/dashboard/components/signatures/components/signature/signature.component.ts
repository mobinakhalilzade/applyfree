import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  file = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  loading: boolean;
  alert: any;
  form = {
    image: null
  }
  error: boolean;

  constructor(
    private uploadService: UploadService,
    private router: Router) { }

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
            this.error = true;
            this.alert = body.message;
          }
        }
      })
    };
  }

  ngOnInit(): void {
  }
}

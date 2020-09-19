import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../dashboard/dashboard.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var BalloonEditor: any;

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.css']
})
export class UpdateContractComponent implements OnInit {
  loading: boolean = true;
  loadTag: boolean;
  submit: boolean;
  inHold: boolean = true;
  inlineModal: boolean;
  selectedTag: any;
  form: any;
  alert: any = {
    return: null
  };
  tag: string;
  tags: [];

  constructor(private service: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      title: null,
      type: null,
      price: null,
      content: null
    });
  }

  contract(id: any, then: any = null) {
    this.service.contract(id).subscribe((response: any) => {
      if (response.status == 200) {
        const data = response.body.data;
        this.inHold = data.hold;
        this.form.setValue({
          title: data.title,
          type: data.type,
          price: data.price,
          content: data.content
        });

        if (data.hold) {
          this.form.controls.title.disable();
          this.form.controls.type.disable();
          this.form.controls.price.disable();
          this.form.controls.content.disable();
        }

        this.tags = data.tags;
        this.loading = false;

        then(data.content);
      }
    });
  }

  contractTags(id: string) {
    this.service.tags(id).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.tags = body.data;
        }
      }
    });
  }

  tagHandler($event: any, tag: string) {
    if ($event.keyCode == 13) {
      this.loadTag = true;
      const command = {
        contract_id: this.route.snapshot.paramMap.get('id'),
        name: tag
      }

      const findDuplicate = this.tags.find(x => x['name'] == tag);

      if (findDuplicate) {
        this.alert.return = 301;
        this.alert.message = "This tag already exist";
        this.loadTag = false;
        return;
      }

      this.alert.return = null;

      this.service.tag(command).subscribe((response: any) => {
        if (response.status == 200) {
          const body = response.body;
          if (body.return == 200) {
            this.contractTags(command.contract_id);
            setTimeout(() => {
              document.getElementById("tag").focus();
            }, 100);
            this.tag = null;
            this.loadTag = false;
          }
        }
      });
    }
  }

  confirmation(id: string) {
    this.inlineModal = true;
    this.selectedTag = id;
  }

  deleteTag() {
    this.loadTag = true;
    this.service.deleteTag({ id: this.selectedTag }).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          this.contractTags(this.route.snapshot.paramMap.get('id'));
          this.loadTag = false;
        }
      }
    });
  }

  update(form: any) {
    this.submit = true;

    const command = {
      id: this.route.snapshot.paramMap.get('id'),
      title: form.title,
      type: form.type,
      price: form.price,
      content: form.content
    }

    this.service.documentation(command).subscribe((response: any) => {
      if (response.status == 200) {
        const body = response.body;
        if (body.return == 200) {
          window.location.href = '/dashboard/contracts/'
        } else {
          this.alert = body;
          this.submit = false;
        }
      }
    });
  }

  ngOnInit(): void {
    const self = this;
    const id = this.route.snapshot.paramMap.get('id');
    this.contract(id, (data: any) => {

      BalloonEditor.create(document.querySelector('#content'), {
        toolbar: {
          items: [
            'fontFamily',
            'fontColor',
            'highlight',
            '|',
            'heading',
            '|',
            'alignment',
            '|',
            'bold',
            'underline',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'blockQuote',
            'insertTable',
            '|',
            'horizontalLine',
            'specialCharacters',
            '|',
            'undo',
            'redo'
          ]
        },
        language: 'en',
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
          ]
        },
        licenseKey: '',
      }).then(editor => {
        editor.setData(data);
        window['editor'] = editor;

        editor.model.document.on('change', () => {
          self.form.setValue({
            title: self.form.value.title,
            type: self.form.value.type,
            price: self.form.value.price,
            content: editor.getData()
          });
        });

      }).catch(error => {
        // console.warn('Build id: kta00klu3ctf-dzm5v1996se2');
        // console.error(error);
      });
    });
  }
}

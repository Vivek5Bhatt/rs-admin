import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { AffliateService } from '../affliate.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-affliate-content',
  templateUrl: './affliate-content.component.html',
  styleUrls: ['./affliate-content.component.css']
})
export class AffliateContentComponent extends RootComponent implements OnInit {

  affliateFormGroup: FormGroup;

  editorConfig = {
    placeholder: 'Enter Affiliate Content',
  };

  public Editor = ClassicEditor;
  affliateDetails: any;

  constructor(
    private _FB: FormBuilder, 
    private _BS: AffliateService, 
    private router: Router,
    private routes: ActivatedRoute,
    public _AS: AlertService) 
    {
      super(_AS)
    }

  ngOnInit(): void {
    this.getAffliateDetails();
    this.affliateFormGroup = this._FB.group({
      content: ['', Validators.required]
    })
  }

  getAffliateDetails(){
    this._BS.getAffliateDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.affliateDetails = data.data;
          this.affliateFormGroup.patchValue(this.affliateDetails);
        }
      }, err => {
        this.alertMessage({ type: "danger", title: "Error Occured", value: err });
      }
    )
  }

  addAffliate() {
    if (this.affliateFormGroup.valid) {
      this._BS.addAffliate(this.affliateFormGroup.value).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/affiliate/list']);
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        },
        error => {
          this.alertMessage({ type: "danger", title: "Error Occured", value: error });
        }
      )
    }
  }

  resetForm() {
    this.affliateFormGroup.reset();
  }

}
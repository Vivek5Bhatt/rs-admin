import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent extends RootComponent implements OnInit {

  bannerFormGroup: FormGroup;
  files: File[] = [];

  constructor(private _FB: FormBuilder, private _BS: BannerService, public _AS: AlertService, private router: Router) {
    super(_AS);
    this.bannerFormGroup = this._FB.group({
      title: ['', Validators.required],
      bannerType: ['', Validators.required],
      bannerFor: ['', Validators.required],
      bannerImg: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addBanner() {
    if (this.bannerFormGroup.valid) {
      const formData = new FormData();
      formData.append("title", this.bannerFormGroup.value.title);
      formData.append("bannerType", this.bannerFormGroup.value.bannerType);
      formData.append("bannerFor", this.bannerFormGroup.value.bannerFor);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("bannerImg", this.files[i]);
      }
      this._BS.addBanner(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/banner/list']);
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

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.bannerFormGroup.patchValue({ bannerImg: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.bannerFormGroup.patchValue({ bannerImg: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.bannerFormGroup.reset();
  }

}

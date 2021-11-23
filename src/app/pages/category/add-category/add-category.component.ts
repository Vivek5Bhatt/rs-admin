import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { GroupNameService } from '../../group-name/group-name.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent extends RootComponent implements OnInit {

  categoryFormGroup: FormGroup;
  files: File[] = [];
  groups: any = [];

  constructor(
    private _FB: FormBuilder,
    private _CS: CategoryService,
    public _AS: AlertService,
    private router: Router,
    private _GS: GroupNameService
  ) {
    super(_AS);
    this.categoryFormGroup = this._FB.group({
      groupId: ['', Validators.required],
      categoryName: ['', Validators.required],
      categoryDesc: ['', Validators.required],
      categoryImg: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllGroupNames();
  }

  getAllGroupNames() {
    this._GS.getAllGroupNames().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.groups = data.data;
        }
      }
    )
  }

  addCategory() {
    if (this.categoryFormGroup.valid) {
      const formData = new FormData();
      formData.append("groupId", this.categoryFormGroup.value.groupId);
      formData.append("categoryName", this.categoryFormGroup.value.categoryName);
      formData.append("categoryDesc", this.categoryFormGroup.value.categoryDesc);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("categoryImg", this.files[i]);
      }
      this._CS.addCategory(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/category/list']);
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
    this.categoryFormGroup.patchValue({ categoryImg: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.categoryFormGroup.patchValue({ categoryImg: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.categoryFormGroup.reset();
  }

}

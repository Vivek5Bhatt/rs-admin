import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent extends RootComponent implements OnInit {

  subCategoryFormGroup: FormGroup;
  files: File[] = [];
  categories: any = [];

  constructor(
    private _FB: FormBuilder,
    private _CS: CategoryService,
    public _AS: AlertService,
    private router: Router
  ) {
    super(_AS);
    this.subCategoryFormGroup = this._FB.group({
      subCategoryName: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryDesc: ['', Validators.required],
      subCategoryImg: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CS.getAllCategories().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categories = data.data;
        }
      }
    )
  }

  addSubCategory() {
    if (this.subCategoryFormGroup.valid) {
      const formData = new FormData();
      formData.append("subCategoryName", this.subCategoryFormGroup.value.subCategoryName);
      formData.append("categoryId", this.subCategoryFormGroup.value.categoryId);
      formData.append("subCategoryDesc", this.subCategoryFormGroup.value.subCategoryDesc);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("subCategoryImg", this.files[i]);
      }
      this._CS.addSubCategory(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/category/detail', this.subCategoryFormGroup.value.categoryId]);
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
    this.subCategoryFormGroup.patchValue({ subCategoryImg: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.subCategoryFormGroup.patchValue({ subCategoryImg: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.subCategoryFormGroup.reset();
  }

}

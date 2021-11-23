import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { GroupNameService } from '../../group-name/group-name.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent extends RootComponent implements OnInit {

  categoryFormGroup: FormGroup;
  files: File[] = [];
  groups: any = [];
  categoryId: string;

  constructor(
    private _FB: FormBuilder,
    private _CS: CategoryService,
    public _AS: AlertService,
    private router: Router,
    private _GS: GroupNameService,
    private route: ActivatedRoute
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
    this.route.params.subscribe(
      data => {
        this.categoryId = data.categoryId;
        this.getAllGroupNames();
        this.getCategoryDetailsWithSubCategories(this.categoryId);
      }
    )
  }

  getCategoryDetailsWithSubCategories(categoryId: string) {
    this._CS.getCategoryDetailsWithSubCategories(categoryId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categoryFormGroup.patchValue(data.data);
          this.getImageBlob(data.data.categoryImg);
        }
      }
    )
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

  async getImageBlob(imgUrl) {
    let res = await fetch(imgUrl + '?type=toqnkart');
    let blob: any = await res.blob();
    this.files.push(blob)
  }

  editCategory() {
    if (this.categoryFormGroup.valid) {
      const formData = new FormData();
      formData.append("groupId", this.categoryFormGroup.value.groupId);
      formData.append("categoryId", this.categoryId);
      formData.append("categoryName", this.categoryFormGroup.value.categoryName);
      formData.append("categoryDesc", this.categoryFormGroup.value.categoryDesc);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("categoryImg", this.files[i]);
      }
      this._CS.editCategory(formData).subscribe(
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

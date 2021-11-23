import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { GroupNameService } from '../group-name.service';

@Component({
  selector: 'app-add-group-name',
  templateUrl: './add-group-name.component.html',
  styleUrls: ['./add-group-name.component.css']
})
export class AddGroupNameComponent extends RootComponent implements OnInit {

  groupNameFormGroup: FormGroup;
  files: File[] = [];
  measurementUnit: any;

  constructor(private _FB: FormBuilder, private _GS: GroupNameService, public _AS: AlertService, private router: Router) {
    super(_AS);
    this.groupNameFormGroup = this._FB.group({
      groupName: ['', Validators.required],
      image: ['', Validators.required],
      attributes: this._FB.array([this.addGroupAttributes()])
    })
  }

  ngOnInit(): void {
    this.getAllMeasurementUnit();
  }

  getAllMeasurementUnit() {
    this._GS.getActiveMeasurementUnit().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.measurementUnit = data.data;
        }
      }
    )
  }

  addGroupAttributes() {
    return this._FB.group({
      name: ['', Validators.required],
      unit: ['', Validators.required]
    })
  }

  get groupAttributeArray() {
    return <FormArray>this.groupNameFormGroup.get("attributes")
  }

  addNewGroupAttributes() {
    this.groupAttributeArray.push(this.addGroupAttributes())
  }

  removeGroupAttributes(index) {
    this.groupAttributeArray.removeAt(index)
  }

  addGroupName() {
    if (this.groupNameFormGroup.valid) {
      const formData = new FormData();
      formData.append("groupName", this.groupNameFormGroup.value.groupName);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("groupImg", this.files[i]);
      }
      for (var i = 0; i < this.groupNameFormGroup.value.attributes.length; i++) {
        formData.append("attributes", JSON.stringify(this.groupNameFormGroup.value.attributes[i]));
      }
      this._GS.addGroupName(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/group-name/list']);
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
    this.groupNameFormGroup.patchValue({ image: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.groupNameFormGroup.patchValue({ image: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.groupNameFormGroup.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { GroupNameService } from '../group-name.service';

@Component({
  selector: 'app-edit-group-name',
  templateUrl: './edit-group-name.component.html',
  styleUrls: ['./edit-group-name.component.css']
})
export class EditGroupNameComponent extends RootComponent implements OnInit {

  groupNameFormGroup: FormGroup;
  files: File[] = [];
  groupId: string;
  measurementUnit: any;

  constructor(
    private _FB: FormBuilder,
    private _GS: GroupNameService,
    public _AS: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(_AS);
    this.groupNameFormGroup = this._FB.group({
      groupName: ['', Validators.required],
      groupImg: [''],
      attributes: this._FB.array([])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.groupId = data.groupId;
        this.getGroupDetails();
        this.getAllMeasurementUnit();
      }
    )
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

  getGroupDetails() {
    this._GS.getGroupDetails(this.groupId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.groupNameFormGroup.patchValue({ groupName: data.data.groupName });
          if (data.data && data.data.attributes.length) {
            data.data.attributes.map((_) => {
              this.groupNameFormGroup.addControl
              this.addNewGroupAttributes(_)
            })
          }
          else {
            this.addNewGroupAttributes();
          }
          this.getImage(data.data.groupImg);
        }
      }
    )
  }

  addGroupAttributes(data?) {
    return this._FB.group({
      name: [data ? data.name : '', Validators.required],
      unit: [data ? data.unit : '', Validators.required]
    })
  }

  get groupAttributeArray() {
    return <FormArray>this.groupNameFormGroup.get("attributes")
  }

  addNewGroupAttributes(data?: any) {
    this.groupAttributeArray.push(this.addGroupAttributes(data ? data : null))
  }

  removeGroupAttributes(index) {
    this.groupAttributeArray.removeAt(index)
  }

  async getImage(url) {
    await fetch(url + '?type=toqnkart')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(myBlob => {
        let blob: any = myBlob;
        this.files.push(blob);
        this.groupNameFormGroup.patchValue({ groupImg: url });
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  editGroupName() {
    if (this.groupNameFormGroup.valid) {
      const formData = new FormData();
      formData.append("groupName", this.groupNameFormGroup.value.groupName);
      formData.append("groupId", this.groupId);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("groupImg", this.files[i]);
      }
      for (var i = 0; i < this.groupNameFormGroup.value.attributes.length; i++) {
        formData.append("attributes", JSON.stringify(this.groupNameFormGroup.value.attributes[i]));
      }
      this._GS.editGroupName(formData).subscribe(
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
    this.groupNameFormGroup.patchValue({ groupImg: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.groupNameFormGroup.patchValue({ groupImg: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.groupNameFormGroup.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { DiscountService } from '../discount.service';
import * as moment from "moment";

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent extends RootComponent implements OnInit {

  discountFormGroup: FormGroup;
  files: File[] = [];
  minFromDate: string;
  minUpToDate: string;
  validFrom: number;
  validUpto: number;
  discountId: string;

  constructor(
    private _FB: FormBuilder,
    private _DS: DiscountService,
    public _AS: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(_AS)
    this.minFromDate = moment().format('YYYY-MM-DD');
    this.minUpToDate = moment().add(1, 'day').format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.discountFormGroup = this._FB.group({
      discountName: ['', Validators.required],
      discountNumber: ['', Validators.required],
      validFrom: ['', Validators.required],
      validUpto: ['', Validators.required],
      discountIn: ['', Validators.required],
      discountImg: ['', Validators.required]
    })
    this.discountFormGroup.get('validFrom').valueChanges.subscribe(
      data => {
        let today = moment()
        let validFromData = moment(data);
        let days = validFromData.diff(today, 'days') + 1;
        this.minUpToDate = moment().add(days, 'day').format('YYYY-MM-DD');
        this.validFrom = moment(data).valueOf();
      }
    )
    this.discountFormGroup.get('validUpto').valueChanges.subscribe(
      data => {
        this.validUpto = moment(data).valueOf();
      }
    )
    this.route.params.subscribe(
      data => {
        this.discountId = data.discountId;
        this.getDiscountDetails();
      }
    )
  }

  getDiscountDetails() {
    this._DS.getDiscountDetails(this.discountId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.discountFormGroup.patchValue(data.data);
          this.discountFormGroup.patchValue({validFrom:moment(data.data.validFrom).format('YYYY-MM-DD')});
          this.discountFormGroup.patchValue({validUpto:moment(data.data.validUpto).format('YYYY-MM-DD')});
          this.getImageBlob(data.data.discountImg[0]);
        }
      }
    )
  }

  async getImageBlob(imgUrl) {
    let res = await fetch(imgUrl + '?type=toqnkart')
    let blob: any = await res.blob();
    this.files.push(blob)
  }

  editDiscount() {
    if (this.discountFormGroup.valid) {
      let formData = new FormData();
      formData.append('discountName', this.discountFormGroup.value.discountName);
      formData.append('discountId', this.discountId);
      formData.append('discountNumber', this.discountFormGroup.value.discountNumber);
      formData.append('validFrom', `${this.validFrom}`);
      formData.append('validUpto', `${this.validUpto}`);
      formData.append('discountIn', this.discountFormGroup.value.discountIn);
      for (var i = 0; i < this.files.length; i++) {
        formData.append("discountImg", this.files[i]);
      }
      this._DS.editDiscount(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/discount/list']);
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.discountFormGroup.patchValue({ discountImg: this.files });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.discountFormGroup.patchValue({ discountImg: this.files });
  }

  resetForm() {
    this.onRemove(this.files[0]);
    this.discountFormGroup.reset();
  }

}

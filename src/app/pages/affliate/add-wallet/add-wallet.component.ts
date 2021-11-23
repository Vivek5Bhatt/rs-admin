import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute,Router } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { AffliateService } from '../affliate.service'; 

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent extends RootComponent implements OnInit {
  walletFormGroup: FormGroup;
  userId: string;

  constructor(
    private _FB: FormBuilder,
    private _RS: AffliateService,
    public _AS: AlertService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    super(_AS);
  }

  ngOnInit(): void {
    this.walletFormGroup = this._FB.group({
      amount: ['', Validators.required]
    })
    this.routes.params.subscribe(
      data => {
        if (data.userId) {
          this.getUserDetail(data.userId);
          this.userId = data.userId;
        }
      }
    )
  }

  getUserDetail(userId: string) {
    this._RS.getAffliateDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.walletFormGroup.patchValue(data.data);
        }
      }
    )
  }

  addWallet() {
    if (this.walletFormGroup.valid) {
      const updateWallet = {
        amount: this.walletFormGroup.value.amount,
        userId: this.userId
      }
      this._RS.addWallet(updateWallet).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.router.navigate(['/affiliate/list']);
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

  resetForm() {
    this.walletFormGroup.reset();
  }

}

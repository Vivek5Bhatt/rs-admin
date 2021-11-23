import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../banner.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { AlertService } from '../../../_services';

@Component({
  selector: 'app-banner-details',
  templateUrl: './banner-details.component.html',
  styleUrls: ['./banner-details.component.css']
})
export class BannerDetailsComponent extends RootComponent implements OnInit {

  @ViewChild('confirmModal') public confirmModal: ModalDirective;
  bannerDetails: any;
  bannerId: string;
  bannerStatus: string;

  constructor(private routes: ActivatedRoute, private _BS: BannerService, public _AS: AlertService,private _routes: Router) {
    super(_AS);
  }

  ngOnInit(): void {
    this.routes.params.subscribe(
      data => {
        if (data.bannerId) {
          this.bannerId = data.bannerId;
          this.getBannerDetails(data.bannerId);
        }
      }
    )
  }

  getBannerDetails(bannerId: string) {
    this._BS.getBannerDetails(bannerId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.bannerDetails = data.data;
        }
      }
    )
  }

  checkStatus(eve) {
    if (eve === 'DELETE') {
      this.bannerStatus = eve;
      this.confirmModal.show();
      this.confirmModal.onHidden.subscribe(data => {
        this.bannerStatus = '';
        this._routes.navigate(['banner/list'])
      })
    }
    else {
      this.bannerStatus = eve.target.checked ? "ACTIVE" : "DEACTIVE";
      this.changeStatus();
    }
  }

  hideConfirmModal(){
    this.confirmModal.hide();
  }

  changeStatus() {
    if (this.bannerStatus) {
      let obj = {
        status: this.bannerStatus,
        bannerId: this.bannerId
      }
      this._BS.changeStatus(obj).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.getBannerDetails(this.bannerId);
            this.hideConfirmModal();
            this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          }
          else {
            this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      )
    }
  }

}

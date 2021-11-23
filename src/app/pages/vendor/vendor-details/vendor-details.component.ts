import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../_services";
import { BsModalService, BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { RootComponent } from "../../../_shared/components/root/root.component";
import { VendorService } from "../vendor.service";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-vendor-details",
  templateUrl: "./vendor-details.component.html",
  styleUrls: ["./vendor-details.component.css"],
})
export class VendorDetailsComponent extends RootComponent implements OnInit {
  @ViewChild("reasonModal") public reasonModal: ModalDirective;
  vendorDetails: any;
  kycDetails: any;
  vendorId: string;
  reasonFormGroup: FormGroup;
  modalRef: BsModalRef;
  config: ModalOptions = {
    ignoreBackdropClick: false,
    keyboard: false,
  };

  constructor(
    private routes: ActivatedRoute,
    private _VS: VendorService,
    public _AS: AlertService,
    private _FB: FormBuilder,
    private modalService: BsModalService
  ) {
    super(_AS);
    this.reasonFormGroup = this._FB.group({
      reason: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.routes.params.subscribe((data) => {
      if (data.vendorId) {
        this.vendorId = data.vendorId;
        this.getVendorDetails();
      }
    });
  }

  getVendorDetails() {
    this._VS.getVendorDetails(this.vendorId).subscribe((data: any) => {
      if (data.meta.status) {
        this.vendorDetails = data.data;
        this.kycDetails = data.kycData;
      }
    });
  }

  docType: string;
  showReasonModal(docType: string) {
    this.docType = docType;
    this.reasonModal.show();
    this.reasonModal.onHidden.subscribe((data) => {
      this.reasonFormGroup.reset();
      this.docType = "";
    });
  }

  hideReasonModal() {
    this.reasonModal.hide();
  }

  approveRejectKyc(type: string, status: string) {
    let kycData = {
      KycType: type,
      status: status,
      vendorId: this.vendorId,
      ...this.reasonFormGroup.value,
    };
    this._VS.approveRejectKyc(kycData).subscribe((data: any) => {
      if (data.meta.status) {
        this.getVendorDetails();
        this.hideReasonModal();
        this.alertMessage({
          type: "success",
          title: "Success",
          value: data.meta.msg,
        });
      } else {
        this.alertMessage({
          type: "danger",
          title: "Error Occured",
          value: data.meta.msg,
        });
      }
    });
  }

  fullImage: string;
  altName: string;
  openModal(template: TemplateRef<any>, image: string, altName) {
    console.warn(image)
    console.warn(altName);
    this.fullImage = image;
    this.altName = altName;
    this.modalRef = this.modalService.show(
      template,
      Object.assign(this.config, {
        class: "gray modal-lg modal-dialog-centered ",
      })
    );
  }
}

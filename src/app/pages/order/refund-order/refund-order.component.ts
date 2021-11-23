import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-refund-order',
  templateUrl: './refund-order.component.html',
  styleUrls: ['./refund-order.component.css']
})
export class RefundOrderComponent extends RootComponent implements OnInit {
  config: ModalOptions = {
    ignoreBackdropClick: false,
    keyboard: false,
  };
  orders: any = [];
  userId: string;
  divIndex=-1
  modalRef: BsModalRef;
  order$:Observable<any>
  constructor(private _OS: OrderService, public _AS: AlertService, private routes: ActivatedRoute,private modalService: BsModalService) {
    super(_AS);
  }

  ngOnInit(): void {
    this.order$=this._OS.refundOrderList()
  }

  getAllOrders() {
    this._OS.getAllOrders().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.orders = data.data;
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

  getAllOrdersAccordingToUserId() {
    this._OS.getAllOrdersByUserId(this.userId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.orders = data.data;
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }
  showRefundProduct(index){
    this.divIndex=index
  }
  refund(userId,orderId,productId,variantId,TotalPrice){
    let obj={
      userId:userId,
      productId:productId,
      variantId:variantId,
      orderId:orderId,
      totalPrice:TotalPrice
    }

    this._OS.refundCompleted(obj).subscribe(res=>{
      if(res['meta']['status']){
        this.alertMessage({ type: "success", title: "Success", value: res['meta'].msg });
        this.ngOnInit()
      }
      else{
        this.alertMessage({ type: "danger", title: "Error Occured", value: res['meta'].msg });

      }
    })

  }
  fullImage:any;
  openModal(template: TemplateRef<any>, image: string) {
    this.fullImage = image;
    this.modalRef = this.modalService.show(
      template,
      Object.assign(this.config, {
        class: "gray modal-lg modal-dialog-centered ",
      })
    );
  }
}

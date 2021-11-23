import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends RootComponent implements OnInit {

  orders: any = [];
  userId: string;

  constructor(private _OS: OrderService, public _AS: AlertService, private routes: ActivatedRoute) {
    super(_AS);
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe(
      data => {
        if (data && data.userId) {
          this.userId = data.userId;
          this.getAllOrdersAccordingToUserId();
        }
        else {
          this.getAllOrders();
        }
      }
    )
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

}

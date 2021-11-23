import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  orderDetails: any;

  constructor(private route: ActivatedRoute, private _OS: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (data: any) => {
        this.orderId = data && data.orderId ? data.orderId : undefined;
        this.getOrderDetails();
      }
    )
  }

  getOrderDetails() {
    this._OS.getOrderDetails(this.orderId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.orderDetails = data.data;
          console.log(this.orderDetails);
        }
      }
    )
  }

}

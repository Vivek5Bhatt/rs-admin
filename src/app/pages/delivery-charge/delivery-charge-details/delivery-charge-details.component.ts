import { Component, OnInit } from '@angular/core';
import { DeliveryChargeService } from '../delivery-charge.service';

@Component({
  selector: 'app-delivery-charge-details',
  templateUrl: './delivery-charge-details.component.html',
  styleUrls: ['./delivery-charge-details.component.css']
})
export class DeliveryChargeDetailsComponent implements OnInit {

  deliveryChargeDetail: any;

  constructor(private _DS: DeliveryChargeService) { }

  ngOnInit(): void {
    this.getDeliveryChargeDetails();
  }

  getDeliveryChargeDetails() {
    this._DS.getDeliveryDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.deliveryChargeDetail = data.data;
        }
      }
    )
  }

}

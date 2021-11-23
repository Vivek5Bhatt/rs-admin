import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../discount.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  discounts: any = [];

  constructor(private _DS: DiscountService) { }

  ngOnInit(): void {
    this.getDiscountList();
  }

  getDiscountList() {
    this._DS.discountList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.discounts = data.data;
        }
      }
    )
  }

}

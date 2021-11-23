import { Component, OnInit } from '@angular/core';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {

  banners: any = [];

  constructor(private _BS: BannerService) { }

  ngOnInit(): void {
    this.getBannerList();
  }

  getBannerList() {
    this._BS.getBannerList().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.banners = data.data;
        }
      }
    )
  }

}

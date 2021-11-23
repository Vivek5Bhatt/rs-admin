import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  addBanner(bannerData: FormData) {
    const url = `${environment.apiUrl}banners/add`;
    return this.http.post(url, bannerData);
  }

  getBannerList() {
    const url = `${environment.apiUrl}banners/list`;
    return this.http.get(url);
  }

  getBannerDetails(bannerId: string) {
    const url = `${environment.apiUrl}banners/details/${bannerId}`;
    return this.http.get(url);
  }

  changeStatus(statusData: any) {
    const url = `${environment.apiUrl}banners/status`;
    return this.http.put(url, statusData);
  }

}

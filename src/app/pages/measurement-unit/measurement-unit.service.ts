import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  constructor(private http:HttpClient) { }

  addMeasurement(bannerData: FormData) {
    const url = `${environment.apiUrl}measurement/add`;
    return this.http.post(url, bannerData);
  }

  updateMeasurement(bannerData: object) {
    const url = `${environment.apiUrl}measurement/update`;
    return this.http.put(url, bannerData);
  }

  changeStatus(statusData: object) {
    const url = `${environment.apiUrl}measurement/status`;
    return this.http.put(url, statusData);
  }

  deleteMeasurement(measurementId: String) {
    const url = `${environment.apiUrl}measurement/delete/${measurementId}`;
    return this.http.delete(url);
  }

  getMeasurementList() {
    const url = `${environment.apiUrl}measurement/list`;
    return this.http.get(url);
  }

  getMeasurementDetails(measurementId:String) {
    const url = `${environment.apiUrl}measurement/details/${measurementId}`;
    return this.http.get(url);
  }
}

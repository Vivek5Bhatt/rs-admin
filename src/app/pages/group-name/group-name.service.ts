import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupNameService {

  constructor(private http: HttpClient) { }

  addGroupName(groupNameData: any) {
    const url = `${environment.apiUrl}group/add`;
    return this.http.post(url, groupNameData);
  }

  editGroupName(groupNameData: any) {
    const url = `${environment.apiUrl}group/update`;
    return this.http.put(url, groupNameData);
  }

  getAllGroupNames() {
    const url = `${environment.apiUrl}group/list`;
    return this.http.get(url);
  }

  getActiveMeasurementUnit() {
    const url = `${environment.apiUrl}measurement/active/list`;
    return this.http.get(url);
  }

  getMeasurementUnit() {
    const url = `${environment.apiUrl}measurementunit/list`;
    return this.http.get(url);
  }

  getGroupDetails(groupId: string) {
    const url = `${environment.apiUrl}group/details/${groupId}`;
    return this.http.get(url);
  }

}

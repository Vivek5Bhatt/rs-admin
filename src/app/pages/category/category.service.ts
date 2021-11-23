import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(categoryData: any) {
    const url = `${environment.apiUrl}category/add`;
    return this.http.post(url, categoryData);
  }

  editCategory(categoryData: any) {
    const url = `${environment.apiUrl}category/update`;
    return this.http.put(url, categoryData);
  }

  addSubCategory(subCategoryData: any) {
    const url = `${environment.apiUrl}category/subcategory/add`;
    return this.http.post(url, subCategoryData);
  }
  
  editSubCategory(subCategoryData: any) {
    const url = `${environment.apiUrl}category/subcategory/update`;
    return this.http.put(url, subCategoryData);
  }

  getSubCategoryDetail(categoryId: string, subCategoryId: string) {
    const url = `${environment.apiUrl}category/subcategory/detail/${categoryId}/${subCategoryId}`;
    return this.http.get(url);
  }

  getAllCategories() {
    const url = `${environment.apiUrl}category/list`;
    return this.http.get(url);
  }

  getCategoryDetailsWithSubCategories(categoryId: string) {
    const url = `${environment.apiUrl}category/details/${categoryId}`;
    return this.http.get(url);
  }

  changeStatus(data: any) {
    const url = `${environment.apiUrl}category/activedeactivecategory`;
    return this.http.put(url,data);
  }

  changeSubCategoryStatus(data: any) {
    const url = `${environment.apiUrl}category/activedeactivesubcategory`;
    return this.http.put(url,data);
  }
}

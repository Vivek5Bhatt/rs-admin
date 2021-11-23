import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-detail-subcategory',
  templateUrl: './category-detail-subcategory.component.html',
  styleUrls: ['./category-detail-subcategory.component.css']
})
export class CategoryDetailSubcategoryComponent implements OnInit {

  categoryDetailWithSubCategories: any;
  categoryId: string;

  constructor(private routes: ActivatedRoute, private _CS: CategoryService) { }

  ngOnInit(): void {
    this.routes.params.subscribe(
      data => {
        if (data.categoryId) {
          this.categoryId = data.categoryId;
          this.getCategoryDetailsWithSubCategories(data.categoryId);
        }
      }
    )
  }

  getCategoryDetailsWithSubCategories(categoryId: string) {
    this._CS.getCategoryDetailsWithSubCategories(categoryId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categoryDetailWithSubCategories = data.data;
        }
      }
    )
  }

  changeStatus(event,subCategoryId:string,categoryId:string){
    let obj = {
      status: event.target.checked ? 'ACTIVE':'DEACTIVE',
      subcategoryId: subCategoryId,
      categoryId:categoryId
    }
  
    this._CS.changeSubCategoryStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
         this.ngOnInit();
        }
        else {
          this.ngOnInit();
        }
      }
    )
  }
}

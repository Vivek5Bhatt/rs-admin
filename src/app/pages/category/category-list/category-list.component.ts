import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: any = [];

  constructor(private _CS: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._CS.getAllCategories().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.categories = data.data;
        }
      }
    )
  }
  changeStatus(event,categoryId:string){
    let obj = {
      status: event.target.checked ? 'ACTIVE':'DEACTIVE',
      categoryId: categoryId
    }
    this._CS.changeStatus(obj).subscribe(
      (data: any) => {
       this.getAllCategories();
      }
    )
  }
}

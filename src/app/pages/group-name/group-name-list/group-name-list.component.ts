import { Component, OnInit } from '@angular/core';
import { GroupNameService } from '../group-name.service';

@Component({
  selector: 'app-group-name-list',
  templateUrl: './group-name-list.component.html',
  styleUrls: ['./group-name-list.component.css']
})
export class GroupNameListComponent implements OnInit {

  groups: any = [];

  constructor(private _GS: GroupNameService) { }

  ngOnInit(): void {
    this.getAllGroupNames();
  }

  getAllGroupNames() {
    this._GS.getAllGroupNames().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.groups = data.data;
        }
      }
    )
  }

}

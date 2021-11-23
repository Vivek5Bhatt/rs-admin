import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupNameService } from '../group-name.service';

@Component({
  selector: 'app-group-name-detail',
  templateUrl: './group-name-detail.component.html',
  styleUrls: ['./group-name-detail.component.css']
})
export class GroupNameDetailComponent implements OnInit {

  groupDetails: any;
  groupId: string;

  constructor(private _GS: GroupNameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.groupId = data.groupId;
        this.getGroupDetails();
      }
    )
  }

  getGroupDetails() {
    this._GS.getGroupDetails(this.groupId).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.groupDetails = data.data;
        }
      }
    )
  }

}

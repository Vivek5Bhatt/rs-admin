import { Component, OnInit } from '@angular/core';
import { RootComponent } from './../../../_shared/components/root/root.component';
import { AlertService } from './../../../_services/alert.service';
import { AffliateService } from '../affliate.service';

@Component({
  selector: 'app-affliate-list',
  templateUrl: './affliate-list.component.html',
  styleUrls: ['./affliate-list.component.css']
})
export class AffliateListComponent extends RootComponent implements OnInit {

  affliate: any = [];
  status: any;
  userId: any;

  constructor(
    private _US: AffliateService,
    public _AS:AlertService) 
    { 
      super(_AS);
    }

  ngOnInit(): void {
    this.getAllAffliate();
  }

  getAllAffliate() {
    this._US.getAllAffliate().subscribe(
      (data: any) => {
        this.affliate = data.data;
        console.log(this.affliate);
      }
    )
  }

  selectAffliate(event) {
    this.status = event.target.value;
  }

  updateStatus(event, userId) {
    if(this.status != undefined){
      let obj = {
        userId: userId,
        status: this.status
      }
      this._US.updateAffliateStatus(obj).subscribe((data:any)=>{
        if(data.meta.status){
          this.alertMessage({
            type: "success",
            title: "Success",
            value: data.meta.msg,
          });
          this.getAllAffliate();
        } else {
          this.alertMessage({
            type: "danger",
            title: "Error Occured",
            value: data.meta.msg,
          });
        }
      })
    }
  }

}

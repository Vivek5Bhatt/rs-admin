import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../contact-info.service';

@Component({
  selector: 'app-contact-info-details',
  templateUrl: './contact-info-details.component.html',
  styleUrls: ['./contact-info-details.component.css']
})
export class ContactInfoDetailsComponent implements OnInit {

  contactDetails: any;
  constructor(private _CS: ContactInfoService) { }

  ngOnInit(): void {
    this.getContactInfoDetails();
  }

  getContactInfoDetails(){
    this._CS.getContactInfoDetails().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.contactDetails = data.data;
        }
      }
    )
  }
}

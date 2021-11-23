import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../_services';
import { RootComponent } from '../../../_shared/components/root/root.component';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent extends RootComponent implements OnInit {

  quotes: any = [];

  constructor(private _QS: QuoteService, public _AS: AlertService) {
    super(_AS);
  }

  ngOnInit(): void {
    this.getAllQuotes();
  }

  getAllQuotes() {
    this._QS.getAllQuotes().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.quotes = data.data;
        }
      }
    )
  }

  changeStatus(eve, quoteId: string) {
    let obj = {
      status: eve.target.checked,
      quoteId: quoteId
    }
    this._QS.changeStatus(obj).subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.getAllQuotes();
          this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
        }
        else {
          this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
        }
      }
    )
  }

}

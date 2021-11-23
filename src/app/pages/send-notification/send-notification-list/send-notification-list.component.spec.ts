import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationListComponent } from './send-notification-list.component';

describe('SendNotificationListComponent', () => {
  let component: SendNotificationListComponent;
  let fixture: ComponentFixture<SendNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

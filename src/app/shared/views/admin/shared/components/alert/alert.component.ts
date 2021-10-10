import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';

import { AlertTypes } from '../../models/enums';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  public text!: string;
  public type!: AlertTypes;

  private alertSubscr!: Subscription;

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
    this.createAlertSubscription();
  }

  ngOnDestroy() {
    this.destroyAlertSubscription();
  }

  private createAlertSubscription() {
    this.alertSubscr = this._alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);

        this.text = '';
      }, this.delay);
    });
  }

  private destroyAlertSubscription() {
    if (this.alertSubscr) this.alertSubscr.unsubscribe();
  }
}

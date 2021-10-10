import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IAlert } from './../models/interfaces';

import { AlertTypes } from './../models/enums';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alert$ = new Subject<IAlert>();

  callAlertMessage(alertType: AlertTypes, text: string) {
    this.alert$.next({ type: alertType, text });
  }
}

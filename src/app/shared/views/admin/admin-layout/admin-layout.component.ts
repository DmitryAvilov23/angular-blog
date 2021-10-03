import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../services/auth.service';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private _router: Router, public _authService: AuthService) {}

  ngOnInit(): void {}

  signOut(event: Event) {
    event.preventDefault();

    this._authService.signOut();

    this._router.navigate(['/admin', 'login']);
  }
}

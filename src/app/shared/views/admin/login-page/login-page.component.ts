import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';

import { ILoginData } from './../shared/models/interfaces';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  notAuthMessage!: string;

  get requiredPasswordLength(): number {
    return this.form.get('password')?.errors?.minlength.requiredLength;
  }

  get actualPasswordLength(): number {
    return this.form.get('password')?.errors?.minlength.actualLength;
  }

  constructor(
    public _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.isAuthorized) {
        this.notAuthMessage = 'Please log in';
      } else if (params.authFailed) {
        this.notAuthMessage = 'The session has expired. Re-enter the data';
      }
    });

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  signInWithEmailAndPassword() {
    if (this.form.invalid) {
      return;
    }

    const data: ILoginData = this.generateLoginData();

    this._authService.signInWithEmailAndPassword(data).subscribe(() => {
      this.form.reset();
      this.redirectToDashboard();
    });
  }

  private generateLoginData(): ILoginData {
    return {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      returnSecureToken: true,
    };
  }

  private redirectToDashboard() {
    this._router.navigate(['/admin', 'dashboard']);
  }
}

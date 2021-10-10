import { AlertTypes } from './enums';

export interface ILoginData {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IUser {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  registered: boolean;
}

export interface IAlert {
  type: AlertTypes;
  text: string;
}

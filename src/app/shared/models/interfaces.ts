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

export interface IPost {
  id?: string;
  title: string;
  author: string;
  content?: string;
  date?: Date;
}

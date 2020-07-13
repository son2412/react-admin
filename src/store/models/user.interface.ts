export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: number;
  created_at: string;
  phone: string;
  roles: IRole[];
}

export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export interface IRole {
  name: string;
}

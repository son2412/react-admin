export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: number;
  created_at: string;
  phone: string;
  birthday: string;
  roles: IRole[];
  avatar: string;
  login_type: number;
  // image: IAvatar;
}

export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export interface IRole {
  name: string;
}

export interface IAvatar {
  id: string;
  imageable_id: number;
  imageable_type: number;
  url: string;
}

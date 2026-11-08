import { RoleEnum } from '../enums/role.enum';

export interface UserModel {
  id: string;
  email: string;
  role: RoleEnum;
  isActive: boolean;
}

export interface SessionModel {
  userId: string;
  role: RoleEnum;
  email: string;
}

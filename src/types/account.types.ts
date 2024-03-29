export enum RolesSystem {
  ADMIN = "ADMIN",
  USER = "USER",
  PRODUCT = "CONTENT MANAGER",
  ORDER = "ORDER MANAGER",
  HR = "HUMAN RESOURCES",
}

export type User = {
  id: string;
  name: string;
  email: string;
  activated: boolean;
  hashedPassword: string;
  langKey: string;
  authorities: RolesSystem[];
  token?: string;
  login?: string;
  emailVerified?: Date;
  createdBy?: string;
  createdAt?: Date | string;
  lastModifiedBy?: string;
  updatedAt?: Date | string;
};

export type UserList = {
  content: User[];
  totalItems: number;
};

export type AccountError = {
  title: string;
  errorKey: "userexists" | "emailexists";
};

export type Account = User;

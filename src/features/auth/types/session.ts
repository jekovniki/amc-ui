import { UserPermission } from "./permissions";

export enum StorageKeys {
  SessionData = "amc_us",
}

export type UserSessionData = {
  email: string;
  firstName: string;
  lastName: string;
  job: string;
  createdAt: string;
  updatedAt: string;
  permissions: UserPermission[];
  companyId: string;
  entities: string[];
  role: string;
  logo?: string;
};

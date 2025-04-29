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
  permissions: string[];
  companyId: string;
  entities: string[];
  role: string;
  logo?: string;
};

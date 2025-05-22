import { UserRole } from "@/features/auth/types/role";

export type AddUserToCompanyRequest = {
  users: AddUserToCompanyData[];
};

export type AddUserToCompanyData = {
  email: string;
  role_id: number;
};

export type CompanyUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  job: string;
};

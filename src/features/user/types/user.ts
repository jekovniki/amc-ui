export type AddUserToCompanyRequest = {
  users: AddUserToCompanyData[];
};

export type AddUserToCompanyData = {
  email: string;
  role_id: number;
};

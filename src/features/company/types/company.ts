export type AddCompanyRequest = {
  name: string;
  uic: string;
  logo?: string;
};

export type Company = {
  name: string;
  uic: string;
  logo: string;
  id: string;
  active: boolean;
  createdAt: string;
  updateAt: string;
};

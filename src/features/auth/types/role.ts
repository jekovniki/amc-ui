export type UserRole = {
  id: number;
  name: string;
};

export type RoleTranslations = {
  [language: string]: {
    [roleName: string]: string;
  };
};

export type EmployeeListProps = {
  employees: RegisterEmployeeData[];
  setEmployees: React.Dispatch<React.SetStateAction<RegisterEmployeeData[]>>;
};

export type RegisterEmployeeData = {
  id: number;
  email: string;
  accessLevel: UserRole;
};

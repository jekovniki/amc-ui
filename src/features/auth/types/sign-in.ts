export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  sessionData: string;
};

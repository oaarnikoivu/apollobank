export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
  streetAddress: string;
  postCode: string;
  city: string;
  country: string;
}

export interface Account {
  owner: User;
  currency: string;
  balance: number;
}

interface User {
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

interface Account {
  owner: User;
  currency: string;
  balance: number;
}

const dummyUser: User = {
  id: '1',
  email: 'oliver.aarnikoivu@outlook.com',
  password: 'password',
  firstName: 'Oliver',
  lastName: 'Aarnikoivu',
  dateOfBirth: new Date(1996, 9, 29),
  phone: '+44 (0) 7599 469798',
  streetAddress: '45 An Der Merzel',
  postCode: '8350',
  city: 'Garnich',
  country: 'Luxembourg',
};

const dummyAccount01: Account = {
  owner: dummyUser,
  currency: 'EUR',
  balance: 7000,
};

const dummyAccount02: Account = {
  owner: dummyUser,
  currency: 'GBP',
  balance: 60,
};

export const accounts: Account[] = [dummyAccount01, dummyAccount02];

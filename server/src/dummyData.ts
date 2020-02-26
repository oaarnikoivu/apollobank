const dummyUser = {
  email: 'bob@outlook.com',
  password: 'password',
  firstName: 'Bob',
  lastName: 'Gingo',
  dateOfBirth: new Date(1996, 9, 29),
  phone: '+44 (0) 5453 5522',
  streetAddress: 'Oregon',
  postCode: '8350',
  city: 'Garmich',
  country: 'Antarctica',
};

const dummyAccount01 = {
  owner: dummyUser,
  currency: 'EUR',
  balance: 7000,
};

const dummyAccount02 = {
  owner: dummyUser,
  currency: 'GBP',
  balance: 60,
};

export const accounts: any[] = [dummyAccount01, dummyAccount02];

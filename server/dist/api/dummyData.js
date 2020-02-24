"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummyUser = {
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
exports.accounts = [dummyAccount01, dummyAccount02];
//# sourceMappingURL=dummyData.js.map
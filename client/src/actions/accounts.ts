const API_ENDPOINT = 'http://localhost:8080/api/accounts';

export const fetchAccounts = async () => {
    let accounts = await fetch(API_ENDPOINT).then(res => {
        return res.json();
    });
    return accounts;
};

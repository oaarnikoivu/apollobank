import React, { useState, useEffect } from 'react';
import {
    useMeQuery,
    MeQueryResult,
    useAccountsQuery,
    AccountsQueryResult,
    Account,
    useUpdatePasswordMutation,
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables,
    DeleteAccountMutation,
    DeleteAccountMutationVariables,
    useDeleteAccountMutation,
    LogoutMutationVariables,
    useLogoutMutation,
    LogoutMutation,
} from '../../generated/graphql';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Title } from '../Typography/Title';
import { Dialog } from '../Dialog/Dialog';
import { ReactComponent as Euro } from '../../assets/world.svg';
import { ReactComponent as Dollar } from '../../assets/flag.svg';
import { ReactComponent as Pound } from '../../assets/uk.svg';
import { useHistory } from 'react-router-dom';
import { MutationTuple } from '@apollo/react-hooks';
import { Formik, Form } from 'formik';
import { FormTextField } from '../Forms/FormTextField';
import { theme } from '../../utils/theme';
import { SuccessMessage, ErrorMessage } from '../Alerts/AlertMessage';
import { changePasswordValidationSchema } from '../../schemas /changePasswordValidationSchema';
import { ExecutionResultDataDefault, ExecutionResult } from 'graphql/execution/execute';
import { setAccessToken } from '../../utils/accessToken';
import { Loading } from '../Loading/Loading';

export const Settings: React.FC = () => {
    // GraphQL Queries
    const { data }: MeQueryResult = useMeQuery();
    const accounts: AccountsQueryResult = useAccountsQuery();

    // GraphQL Mutations
    const [updatePassword]: MutationTuple<
        UpdatePasswordMutation,
        UpdatePasswordMutationVariables
    > = useUpdatePasswordMutation();
    const [deleteAccount]: MutationTuple<
        DeleteAccountMutation,
        DeleteAccountMutationVariables
    > = useDeleteAccountMutation();
    const [logout, { client }]: MutationTuple<
        LogoutMutation,
        LogoutMutationVariables
    > = useLogoutMutation();

    // State
    const [showLoadingIcon, setShowLoadingIcon] = useState<boolean>(false);
    const [openPersonalDetailsDialog, setOpenPersonalDetailsDialog] = useState<boolean>(false);
    const [openAccountDetailsDialog, setOpenAccountDetailsDialog] = useState<boolean>(false);
    const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState<boolean>(false);
    const [openAboutDialog, setOpenAboutDialog] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [userBirthDate, setUserBirthDate] = useState<string>('');

    const history = useHistory();

    // When the component mounts, format the logged in users date of birth
    useEffect(() => {
        if (data && data.me) {
            setUserBirthDate(new Date(Date.parse(data.me.dateOfBirth)).toLocaleDateString());
        }
    }, [data]);

    const renderPersonalDetailsDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openPersonalDetailsDialog}
                onClose={() => setOpenPersonalDetailsDialog(false)}
            >
                <Title title="Personal details" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <p style={{ color: 'lightgrey' }}>Full name & date of birth</p>
                    {data &&
                        data.me &&
                        data.me.firstName + ' ' + data.me.lastName + ', ' + userBirthDate}
                    <p style={{ color: 'lightgrey' }}>Residential address</p>
                    {data && data.me && data.me.streetAddress} <br />
                    {data && data.me && data.me.postCode + ' ' + data.me.city} <br />
                    {data && data.me && data.me.country}
                    <p style={{ color: 'lightgrey' }}>Email</p>
                    {data && data.me && data.me.email}
                </div>
            </Dialog>
        );
    };

    const renderAccountDetailsDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openAccountDetailsDialog}
                onClose={() => setOpenAccountDetailsDialog(false)}
            >
                <Title title="Account details" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <p style={{ color: 'lightgrey' }}>Active accounts</p>
                    <List component="nav" aria-label="active-accounts">
                        {accounts.data &&
                            accounts.data.accounts.map((account: Account) => {
                                let svg: any;
                                let currencyFullText: string = '';
                                let balance: string = '';

                                switch (account.currency) {
                                    case 'EUR':
                                        svg = <Euro />;
                                        currencyFullText = 'Euro';
                                        balance = '€' + account.balance;
                                        break;
                                    case 'USD':
                                        svg = <Dollar />;
                                        currencyFullText = 'US Dollar';
                                        balance = '$' + account.balance;
                                        break;
                                    case 'GBP':
                                        svg = <Pound />;
                                        currencyFullText = 'British Pound';
                                        balance = '£' + account.balance;
                                        break;
                                }

                                return (
                                    <ListItem
                                        key={account.id}
                                        button
                                        onClick={() =>
                                            history.push({
                                                pathname: `/accounts/${account.id}`,
                                                state: account,
                                            })
                                        }
                                    >
                                        <ListItemIcon>
                                            <div style={{ width: 32 }}>{svg}</div>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={currencyFullText}
                                            secondary={account.currency}
                                        />
                                        {balance}
                                    </ListItem>
                                );
                            })}
                    </List>
                </div>
            </Dialog>
        );
    };

    const renderChangePasswordDialog = (): JSX.Element => {
        return (
            <Dialog
                isOpen={openChangePasswordDialog}
                onClose={() => setOpenChangePasswordDialog(false)}
            >
                <Title title="Change password" fontSize={18} />
                <div style={{ marginTop: 12 }}>
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={changePasswordValidationSchema}
                        onSubmit={async (data, { setSubmitting, resetForm }) => {
                            setSubmitting(true);

                            try {
                                const response = await updatePassword({
                                    variables: {
                                        oldPassword: data.oldPassword,
                                        newPassword: data.newPassword,
                                    },
                                });

                                if (response && response.data) {
                                    setSubmitting(false);
                                    console.log(response.data);
                                    setSuccessMessage('Password successfully changed!');
                                    setOpenChangePasswordDialog(false);
                                    resetForm();
                                }
                            } catch (error) {
                                const errorMessage = error.message.split(':')[1];
                                setErrorMessage(errorMessage);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div>
                                <Form>
                                    <FormTextField
                                        name="oldPassword"
                                        placeholder="Old password"
                                        type="password"
                                    />
                                    <div style={{ marginTop: 8 }}>
                                        <FormTextField
                                            name="newPassword"
                                            placeholder="New password"
                                            type="password"
                                        />
                                    </div>
                                    <div style={{ marginTop: 8 }}>
                                        <FormTextField
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            type="password"
                                        />
                                    </div>
                                    <div style={{ marginTop: 8 }}>
                                        <ThemeProvider theme={theme}>
                                            <Button
                                                disabled={isSubmitting}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"
                                            >
                                                Change password
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </Dialog>
        );
    };

    const renderAboutDialog = (): JSX.Element => {
        return (
            <Dialog isOpen={openAboutDialog} onClose={() => setOpenAboutDialog(false)}>
                <Title title="About this website" fontSize={18}>
                    <div style={{ marginTop: 12 }}>content</div>
                </Title>
            </Dialog>
        );
    };

    const renderAlertMessage = (): JSX.Element | undefined => {
        if (successMessage.length > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <SuccessMessage message={successMessage} />
                </div>
            );
        } else if (errorMessage.length > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <ErrorMessage message={errorMessage} />
                </div>
            );
        }
    };

    if (!showLoadingIcon) {
        return (
            <>
                <div>
                    {renderPersonalDetailsDialog()}
                    {renderAccountDetailsDialog()}
                    {renderChangePasswordDialog()}
                    {renderAboutDialog()}
                    {renderAlertMessage()}
                    <div style={{ textAlign: 'center' }}>
                        <AccountCircleIcon fontSize={'large'} />
                        <Title
                            title={
                                !!data && data.me ? data.me.firstName + ' ' + data.me.lastName : ''
                            }
                            fontSize={18}
                        />
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="Profile" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenPersonalDetailsDialog(true)}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Personal details" />
                            </ListItem>
                            <ListItem button onClick={() => setOpenAccountDetailsDialog(true)}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary="Account details" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="Security" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenChangePasswordDialog(true)}>
                                <ListItemIcon>
                                    <VpnKeyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change password" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <Title title="About us" fontSize={14} />
                        <List component="nav" aria-label="profile">
                            <ListItem button onClick={() => setOpenAboutDialog(true)}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About this website" />
                            </ListItem>
                        </List>
                    </div>
                    <hr style={{ width: '424px' }} />
                    <div style={{ width: '424px', margin: '0 auto' }}>
                        <List component="nav" aria-label="profile">
                            <ListItem
                                button
                                onClick={async () => {
                                    try {
                                        const response: ExecutionResult<ExecutionResultDataDefault> = await deleteAccount();

                                        if (response && response.data) {
                                            setShowLoadingIcon(true);
                                            setTimeout(async () => {
                                                await logout().then(() => history.push('/'));
                                                setAccessToken('');
                                                client!.resetStore();
                                            }, 3000);
                                        }
                                    } catch (error) {
                                        const errorMessage: string = error.message.split(':')[1];
                                        console.log(errorMessage);
                                    }
                                }}
                            >
                                <ListItemIcon>
                                    <DeleteForeverIcon />
                                </ListItemIcon>
                                <ListItemText primary="Destroy account" />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </>
        );
    } else {
        return <Loading />;
    }
};

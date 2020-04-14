import React from 'react';
import { useMeQuery, MeQueryResult } from '../../generated/graphql';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DescriptionIcon from '@material-ui/icons/Description';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InfoIcon from '@material-ui/icons/Info';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Title } from '../Typography/Title';

export const Settings: React.FC = () => {
    const { data }: MeQueryResult = useMeQuery();

    return (
        <>
            <div>
                <div style={{ textAlign: 'center' }}>
                    <AccountCircleIcon fontSize={'large'} />
                    <Title
                        title={!!data && data.me ? data.me.firstName + ' ' + data.me.lastName : ''}
                        fontSize={18}
                    />
                </div>
                <hr style={{ width: '424px' }} />
                <div style={{ width: '424px', margin: '0 auto' }}>
                    <Title title="Profile" fontSize={14} />
                    <List component="nav" aria-label="profile">
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Personal details" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Account details" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary="Documents" />
                        </ListItem>
                    </List>
                </div>
                <hr style={{ width: '424px' }} />
                <div style={{ width: '424px', margin: '0 auto' }}>
                    <Title title="Security" fontSize={14} />
                    <List component="nav" aria-label="profile">
                        <ListItem button>
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
                        <ListItem button>
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
                        <ListItem button>
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
};

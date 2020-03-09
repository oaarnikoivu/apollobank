import React from 'react';
import { useToolbarStyles } from './Toolbar.style';
import { DrawerToggleButton } from '../SideDrawer/DrawerToggleButton';

interface ToolbarProps {
    drawerClickHandler(): void;
}

const navigationItems: string[] = ['Dashboard', 'Accounts'];

export const Toolbar: React.FC<ToolbarProps> = (props: ToolbarProps) => {
    const classes = useToolbarStyles();

    return (
        <header className={classes.toolbar}>
            <nav className={classes.navigation}>
                <div className={classes.toggleButton}>
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className={classes.logo}>
                    <a href="/">Apollo</a>
                </div>
                <div className={classes.spacer} />
                <div className={classes.navigationItems}>
                    <ul>
                        {navigationItems.map(item => {
                            let routeTo: string = '/';

                            switch (item) {
                                case 'Dashboard':
                                    routeTo = '/dashboard';
                                    break;
                                case 'Accounts':
                                    routeTo = '/accounts';
                                    break;
                            }
                            return (
                                <li key={item}>
                                    <a href={routeTo}>{item}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </header>
    );
};
